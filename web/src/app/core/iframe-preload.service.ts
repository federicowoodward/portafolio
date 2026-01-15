import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class IframePreloadService {
  private cache = new Map<string, HTMLIFrameElement>();
  private hoveredTimer?: number;
  private preloaderRoot?: HTMLElement;

  private ensureRoot() {
    if (!this.preloaderRoot) {
      this.preloaderRoot = document.createElement('div');
      Object.assign(this.preloaderRoot.style, {
        position: 'fixed',
        width: '0px',
        height: '0px',
        overflow: 'hidden',
        opacity: '0',
        pointerEvents: 'none',
        zIndex: '-1',
      });
      document.body.appendChild(this.preloaderRoot);
    }
  }

  /** Solo preconecta orígenes (rápido, barato). */
  preconnect(origins: string[]) {
    const head = document.head;
    for (const o of origins) {
      try {
        const u = new URL(o).origin;
        const pre = document.createElement('link');
        pre.rel = 'preconnect';
        pre.href = u;
        pre.crossOrigin = 'anonymous';
        head.appendChild(pre);

        const dns = document.createElement('link');
        dns.rel = 'dns-prefetch';
        dns.href = u;
        head.appendChild(dns);
      } catch {}
    }
  }

  /** Arranca warmup de iframes *post hover* (debounce + idle). */
  hoverWarmup(urls: string[], debounceMs = 120) {
    // respeta ahorro de datos
    const saveData = (navigator as any)?.connection?.saveData;
    if (saveData) return;

    window.clearTimeout(this.hoveredTimer);
    this.hoveredTimer = window.setTimeout(() => {
      const ric = (window as any).requestIdleCallback as
        | ((cb: Function, opts?: any) => number)
        | undefined;
      const task = () => this.preloadIframes(urls);

      if (ric) ric(task, { timeout: 1500 });
      else setTimeout(task, 300);
    }, debounceMs);
  }

  /** Cancela warmup si el usuario se fue del hover antes de tiempo. */
  cancelHoverWarmup() {
    window.clearTimeout(this.hoveredTimer);
  }

  /** Crea iframes offscreen (no afectan LCP de la vista actual). */
  private preloadIframes(urls: string[]) {
    this.ensureRoot();
    for (const url of urls) {
      if (this.cache.has(url)) continue;
      const iframe = document.createElement('iframe');
      iframe.src = url;
      iframe.loading = 'eager';
      iframe.title = 'preload';
      Object.assign(iframe.style, {
        width: '1px',
        height: '1px',
        visibility: 'hidden',
        border: '0',
      });
      this.cache.set(url, iframe);
      this.preloaderRoot!.appendChild(iframe);
    }
  }

  /** Reusa el mismo nodo iframe ya cargado para no re-navegar. */
  attach(url: string, hostEl: HTMLElement) {
    let iframe = this.cache.get(url);
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.src = url;
      this.cache.set(url, iframe);
    }
    Object.assign(iframe.style, {
      width: '1440px',
      height: '750px',
      transform: 'scale(0.25)',
      transformOrigin: 'top left',
      border: 'none',
      pointerEvents: 'none',
    });
    hostEl.innerHTML = '';
    hostEl.appendChild(iframe);
  }
}
