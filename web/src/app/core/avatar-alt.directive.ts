// avatar-alt.directive.ts
import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appAvatarAlt]', // sirve en <p-avatar ... appAvatarAlt="..."> y en <img ... appAvatarAlt="...">
  standalone: true,
})
export class AvatarAltDirective implements AfterViewInit, OnDestroy {
  @Input('appAvatarAlt') alt = '';

  private mo?: MutationObserver;

  constructor(private host: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    // caso 1: la directiva está en un <img>
    if (this.host.nativeElement.tagName.toLowerCase() === 'img') {
      this.applyAlt(this.host.nativeElement as HTMLImageElement);
      return;
    }

    // caso 2: la directiva está en <p-avatar> (u otro contenedor)
    const trySet = () => {
      const img = this.host.nativeElement.querySelector('.ng-star-inserted');
      if (img) this.applyAlt(img as HTMLImageElement);
    };

    // intento inmediato (por si ya está)
    trySet();

    // observa cambios hasta que aparezca el <img>
    this.mo = new MutationObserver(() => trySet());
    this.mo.observe(this.host.nativeElement, { childList: true, subtree: true });
  }

  ngOnDestroy() {
    this.mo?.disconnect();
  }

  private applyAlt(img: HTMLImageElement) {
    if (!this.alt) return;
    img.setAttribute('alt', this.alt);
    // opcional accesibilidad
    img.removeAttribute('aria-hidden');
  }
}
