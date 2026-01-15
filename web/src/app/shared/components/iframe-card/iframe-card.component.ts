import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { TechIconComponent } from '../tech-icons/tech-icons';
import { IframePreloadService } from '../../../core/iframe-preload.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-iframe-card',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    ChipModule,
    TechIconComponent,
  ],
  templateUrl: './iframe-card.component.html',
})
export class IframeCardComponent implements AfterViewInit {
  @Input() title = 'Sin título';
  @Input() url = '';
  @Input() usePreload = false;

  @ViewChild('iframeContainer') iframeContainerRef?: ElementRef<HTMLElement>;

  constructor(
    private preload: IframePreloadService,
    private sanitizer: DomSanitizer,
  ) {}

  get safeUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  ngAfterViewInit(): void {
    if (this.usePreload && this.url && this.iframeContainerRef) {
      this.preload.attach(this.url, this.iframeContainerRef.nativeElement);
    }
  }
}
