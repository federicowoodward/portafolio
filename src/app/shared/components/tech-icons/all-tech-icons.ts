import {
  Component,
  ElementRef,
  Renderer2,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { icons } from './icons';

@Component({
  selector: 'app-all-tech-icons',
  standalone: true,
  imports: [CommonModule],
  template: `<div #container class="icons-grid px-4 md:px-8 gap-2"></div>`,
  styles: [
    `
      .icons-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }

      .icon-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 60px;
        color: white;
        margin-top: 1rem;
        font-size: 10px;
      }

      .icon-wrapper svg {
        width: 28px;
        height: 28px;
      }
    `,
  ],
})
export class AllTechIconsComponent implements AfterViewInit {
  @ViewChild('container', { static: true }) container!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    const el = this.container.nativeElement;

    Object.entries(icons).forEach(([name, rawSvg]) => {
      const wrapper = this.renderer.createElement('div');
      this.renderer.addClass(wrapper, 'icon-wrapper');

      const tempDiv = this.renderer.createElement('div');
      tempDiv.innerHTML = rawSvg;
      const svg = tempDiv.querySelector('svg');

      if (svg) {
        svg.removeAttribute('width');
        svg.removeAttribute('height');

        if (!svg.hasAttribute('viewBox')) {
          svg.setAttribute('viewBox', '0 0 24 24');
        }

        this.renderer.appendChild(wrapper, svg);
      }

      const label = this.renderer.createElement('span');
      const text = this.renderer.createText(name);
      this.renderer.appendChild(label, text);
      this.renderer.appendChild(wrapper, label);

      this.renderer.appendChild(el, wrapper);
    });
  }
}
