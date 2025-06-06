import { Component, Input, ViewChild, ElementRef } from '@angular/core';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ChipModule } from 'primeng/chip';
import { TechIconComponent } from '../tech-icons/tech-icons';

@Component({
  selector: 'app-iframe-card',
  standalone: true,
  imports: [CardModule, ButtonModule, ChipModule, TechIconComponent],
  templateUrl: './iframe-card.component.html',
})
export class IframeCardComponent {
  @Input() title = 'Sin título';
  @Input() url = '';

  @ViewChild('iframeContainer') iframeContainerRef!: ElementRef;

  constructor(private sanitizer: DomSanitizer) {}

  get safeUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
}
