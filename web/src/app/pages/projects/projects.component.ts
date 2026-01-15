// projects.component.ts
import {
  Component,
  OnDestroy,
  OnInit,
  inject,
  signal,
  computed,
} from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DividerModule } from 'primeng/divider';
import { SkeletonModule } from 'primeng/skeleton';
import { IframeCardComponent } from '../../shared/components/iframe-card/iframe-card.component';
import { GithubCardComponent } from '../../shared/components/github-card/github-card.component';
import {
  SanityPublicClient,
  SANITY_PUBLIC_CONFIG,
} from '../../core/sanity-public.client';
import { CommonModule } from '@angular/common';

type LS = { es?: string; en?: string };
interface ProjectsTexts {
  collabTitle: LS;
  collabDesc: LS;
  ownTitle: LS;
  ownDesc: LS;
}
interface CollabProject {
  key: string;
  title: LS;
  url: string;
  order: number;
  iframeAllowed?: boolean;
}
interface PersonalProject {
  key: string;
  fullName: string;
  description: LS;
  avatarUrl: string;
  htmlUrl: string;
  order: number;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    GithubCardComponent,
    IframeCardComponent,
    TranslateModule,
    DividerModule,
    SkeletonModule,
    CommonModule
  ],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
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
export class ProjectsComponent implements OnInit, OnDestroy {
  private sanity = inject(SanityPublicClient);
  private i18n = inject(TranslateService);
  trackByKey = (_: number, it: { key: string }) => it.key;

  loading = signal(true);
  lang = signal<'es' | 'en'>((this.i18n.currentLang as 'es' | 'en') || 'es');

  texts = signal<ProjectsTexts | null>(null);
  collab = signal<CollabProject[]>([]);
  personal = signal<PersonalProject[]>([]);

  t = (ls?: LS) => ls?.[this.lang()] || ls?.es || ls?.en || '';

  private sub?: any;

  ngOnInit(): void {
    const groq = `
    {
      "texts": *[_type == "projectsTexts"][0]{ collabTitle, collabDesc, ownTitle, ownDesc },
      "collab": *[_type == "collabProject"]|order(order asc){ key, title, url, order, iframeAllowed },
      "personal": *[_type == "personalProject"]|order(order asc){ key, fullName, description, avatarUrl, htmlUrl, order }
    }`;
    this.sanity
      .query<{
        texts: ProjectsTexts;
        collab: CollabProject[];
        personal: PersonalProject[];
      }>(groq)
      .subscribe({
        next: (res: any) => {
          this.texts.set(res?.texts || null);
          this.collab.set(res?.collab || []);
          this.personal.set(res?.personal || []);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });

    this.sub = this.i18n.onLangChange.subscribe((e: any) => {
      this.lang.set((e?.lang as 'es' | 'en') || 'es');
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
