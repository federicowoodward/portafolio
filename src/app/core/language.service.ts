import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly defaultLang = 'es';

  constructor(private translate: TranslateService) {
    const storedLang = localStorage.getItem('lang') as 'es' | 'en' | null;
    const lang = storedLang || this.defaultLang;
    translate.setDefaultLang(this.defaultLang);
    this.setLanguage(lang);
  }

  setLanguage(lang: 'es' | 'en') {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  getLanguage(): 'es' | 'en' {
    return (localStorage.getItem('lang') as 'es' | 'en') || this.defaultLang;
  }
}
