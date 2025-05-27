import { Component, OnDestroy } from '@angular/core';
import {
  TranslateModule,
  TranslateService,
  LangChangeEvent,
} from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { TechIconComponent } from '../../shared/components/tech-icons/tech-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [TranslateModule, CommonModule, TechIconComponent],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
})
export class EducationComponent implements OnDestroy {
  educationKeys: string[] = [];
  educationItems: any = {};
  educationHasCertificate: Record<string, boolean> = {};
  selectedKey: string | null = null;
  private langChangeSub?: Subscription;

  constructor(private translate: TranslateService) {
    this.loadEducationItems();

    this.langChangeSub = this.translate.onLangChange.subscribe(() => {
      this.loadEducationItems();
    });
  }

  ngOnDestroy(): void {
    this.langChangeSub?.unsubscribe();
  }

  private loadEducationItems() {
    this.translate.get('EDUCATION.ITEMS').subscribe((items) => {
      this.educationItems = items || {};
      this.educationKeys = Object.keys(items);
      this.educationHasCertificate = {};

      for (const key of this.educationKeys) {
        this.educationHasCertificate[key] = !!items[key]?.HAS_CERTIFICATE;
      }
    });
  }

  selectItem(key: string) {
    this.selectedKey = key;
  }

  getParagraphs(jobKey: string): string[] {
    const item = this.educationItems[jobKey]?.PARAGRAPHS;
    return Array.isArray(item) ? item : [];
  }

  getIcons(jobKey: string): string[] {
    const item = this.educationItems[jobKey]?.ICONS;
    return Array.isArray(item) ? item : [];
  }
}
