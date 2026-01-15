// experience.component.ts
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
import { TechIconComponent } from '../../shared/components/tech-icons/tech-icons';
import {
  ExperienceItem,
  LocalizedString,
} from '../../shared/interfaces/experience.model';
import { Subscription, startWith } from 'rxjs';
import {
  SanityPublicClient,
  SANITY_PUBLIC_CONFIG,
} from '../../core/sanity-public.client';
import { DividerModule } from 'primeng/divider';
@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, TranslateModule, SkeletonModule, TechIconComponent, DividerModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  providers: [
    {
      provide: SANITY_PUBLIC_CONFIG,
      useValue: {
        projectId: 'YOUR_PROJECT_ID',
        dataset: 'production',
        apiVersion: '2025-09-01',
      } satisfies import('../../core/sanity-public.client').SanityPublicConfig,
    },
  ],
})
export class ExperienceComponent implements OnInit, OnDestroy {
  private sanity = inject(SanityPublicClient);
  private translate = inject(TranslateService);

  loading = signal<boolean>(true);
  items = signal<ExperienceItem[]>([]);
  // idioma reactivo
  private langSub?: Subscription;
  lang = signal<'es' | 'en'>(
    (this.translate.currentLang as 'es' | 'en') || 'es',
  );

  // helper para elegir texto sin requery
  t = (ls?: LocalizedString) => ls?.[this.lang()] || ls?.es || ls?.en || '';

  ngOnInit(): void {
    // 1) Query única: trae ambos idiomas
    const groq = `
      *[_type == "experienceItem"]|order(order asc){
        _id, key, name, role, dates, paragraphs, icons
      }
    `;
    this.sanity.query<ExperienceItem[]>(groq).subscribe({
      next: (res) => {
        this.items.set(res ?? []);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });

    // 2) Cambio de idioma sin re-fetch
    this.langSub = this.translate.onLangChange
      .pipe(startWith({ lang: this.translate.currentLang || 'es' }))
      .subscribe((e: any) => {
        const l = (e?.lang as 'es' | 'en') || 'es';
        this.lang.set(l);
      });
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }
}
