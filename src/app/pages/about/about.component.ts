import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AllTechIconsComponent } from '../../shared/components/tech-icons/all-tech-icons';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-about',
  imports: [TranslateModule, AllTechIconsComponent, DividerModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {}
