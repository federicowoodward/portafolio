import {
  Component,
  Input,
  ElementRef,
  Renderer2,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { icons } from './icons';

@Component({
  selector: 'app-tech-icon',
  standalone: true,
  imports: [CommonModule],
  template: `<span #container class="tech-icon"></span>`,
  styles: [
    `
      .tech-icon {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 28px;
        height: 28px;
      }

      .tech-icon p {
        font-size: 10px;
        margin: 0;
        color: white;
      }
    `,
  ],
})
export class TechIconComponent implements OnChanges {
  @Input() name: string = '';
  @ViewChild('container', { static: true }) container!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnChanges() {
    const el = this.container.nativeElement;

    // Limpiar contenido previo
    while (el.firstChild) {
      this.renderer.removeChild(el, el.firstChild);
    }

    const rawSvg = icons[this.name.toLowerCase()];

    if (rawSvg) {
      const tempDiv = this.renderer.createElement('div');
      tempDiv.innerHTML = rawSvg;
      const svg = tempDiv.querySelector('svg');

      if (svg) {
        svg.removeAttribute('width');
        svg.removeAttribute('height');

        if (!svg.hasAttribute('viewBox')) {
          svg.setAttribute('viewBox', '0 0 24 24');
        }

        this.renderer.appendChild(el, svg);
      }
    } else {
      const fallback = this.renderer.createElement('p');
      const text = this.renderer.createText('mal nombre');
      this.renderer.appendChild(fallback, text);
      this.renderer.appendChild(el, fallback);
    }
  }
}
