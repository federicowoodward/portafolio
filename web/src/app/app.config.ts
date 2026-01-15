import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';
import { provideTranslateModule } from './core/translate.config';
import { provideHttpClient } from '@angular/common/http';
import {
  SANITY_PUBLIC_CONFIG,
  SanityPublicConfig,
} from './core/sanity-public.client';

const sanityCfg: SanityPublicConfig = {
  projectId: 'jl9cl8f1',
  dataset: 'production',
  apiVersion: '2025-09-01',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    provideTranslateModule(),
    provideHttpClient(),
    { provide: SANITY_PUBLIC_CONFIG, useValue: sanityCfg },
  ],
};
