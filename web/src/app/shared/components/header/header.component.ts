import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChipModule } from 'primeng/chip';
import { RouterLinkActive } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { TopButtonsComponent } from '../top-buttons/top-buttons.component';
import { TranslateModule } from '@ngx-translate/core';
import { IframePreloadService } from '../../../core/iframe-preload.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ChipModule,
    RouterLink,
    RouterLinkActive,
    DividerModule,
    TopButtonsComponent,
    TranslateModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private projectsUrls = [
    'https://www.encodesa.com.ar',
    'https://tokelab.io',
    'https://propertize.io',
    'https://clockit.com.ar',
  ];

  constructor(private iframePreload: IframePreloadService) {}

  prefetchProjectsOnHover() {
    // warm handshake primero
    this.iframePreload.preconnect(this.projectsUrls);
    // y en idle, precarga iframes offscreen
    this.iframePreload.hoverWarmup(this.projectsUrls);
  }

  cancelPrefetchProjects() {
    this.iframePreload.cancelHoverWarmup();
  }
}
