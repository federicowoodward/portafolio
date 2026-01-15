import {
  Component,
  OnDestroy,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SkeletonModule } from 'primeng/skeleton';
import { DividerModule } from 'primeng/divider';
import { TechIconComponent } from '../../shared/components/tech-icons/tech-icons';
import { Subscription, startWith } from 'rxjs';
import {
  EducationItem,
  LocalizedString,
} from '../../shared/interfaces/education.model';
import {
  SANITY_PUBLIC_CONFIG,
  SanityPublicClient,
} from '../../core/sanity-public.client';


@Component({
  selector: 'app-education',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SkeletonModule,
    DividerModule,
    TechIconComponent,
  ],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  providers: [
    {
      provide: SANITY_PUBLIC_CONFIG,
      useValue: {
        projectId: 'YOUR_PROJECT_ID',
        dataset: 'production',
        apiVersion: '2025-09-01',
      } as const,
    },
  ],
})
export class EducationComponent implements OnInit, OnDestroy {
  private sanity = inject(SanityPublicClient);
  private translate = inject(TranslateService);

  loading = signal(true);
  items = signal<EducationItem[]>([]);
  selectedKey = signal<string | null>(null);
  lang = signal<'es' | 'en'>(
    (this.translate.currentLang as 'es' | 'en') || 'es',
  );

  private sub?: Subscription;

  t = (ls?: LocalizedString) => ls?.[this.lang()] || ls?.es || ls?.en || '';

  ngOnInit(): void {
    const groq = `
      *[_type == "educationItem"]|order(order asc){
        _id, key, name, role, dates, icons, hasCertificate,
        "certificateUrl": certificate.asset->url
      }
    `;
    this.sanity.query<EducationItem[]>(groq).subscribe({
      next: (res) => {
        this.items.set(res ?? []);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });

    this.sub = this.translate.onLangChange
      .pipe(startWith({ lang: this.translate.currentLang || 'es' }))
      .subscribe((e: any) => this.lang.set((e?.lang as 'es' | 'en') || 'es'));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  iconsOf = (it: EducationItem) => (Array.isArray(it.icons) ? it.icons : []);

  certificateSrc(it: EducationItem): string | undefined {
    if (it.certificateUrl) return it.certificateUrl;
    if (it.hasCertificate && it.key)
      return `assets/certificates/${it.key.toLowerCase()}.jpg`;
    return undefined;
  }

  selectedItem = computed(() => {
    const key = this.selectedKey();
    if (!key) return null;
    return this.items().find((i) => i.key === key) ?? null;
  });
  clearSelection() {
    this.selectedKey.set(null);
  }
}
