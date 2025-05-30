import { Component } from '@angular/core';
import { GithubCardComponent } from '../../shared/components/github-card/github-card.component';
import { IframeCardComponent } from '../../shared/components/iframe-card/iframe-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-projects',
  imports: [GithubCardComponent, IframeCardComponent, TranslateModule, DividerModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {}
