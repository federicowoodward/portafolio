import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { TechIconComponent } from '../../shared/components/tech-icons/tech-icons';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [TranslateModule, CommonModule, TechIconComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {
  experienceItems: any = {};
  experienceKeys: string[] = [];
  loading = true;

  constructor(private translate: TranslateService) {
    this.translate.stream('EXPERIENCE.ITEMS').subscribe((items) => {
      this.experienceItems = items || {};
      this.experienceKeys = Object.keys(this.experienceItems);
      this.loading = false;
    });
  }
}
