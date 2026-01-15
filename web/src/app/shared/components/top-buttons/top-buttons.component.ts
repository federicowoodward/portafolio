import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../core/language.service';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-top-buttons',
  standalone: true,
  templateUrl: './top-buttons.component.html',
  styleUrl: './top-buttons.component.scss',
  imports: [CommonModule, ToggleButtonModule, FormsModule, ButtonModule],
})
export class TopButtonsComponent {
  currentLang: 'es' | 'en';
  checked: boolean = false;
  darkMode = false;

  constructor(private languageService: LanguageService) {
    this.currentLang = this.languageService.getLanguage();
  }

  toggleLanguage(): void {
    const newLang = this.currentLang === 'es' ? 'en' : 'es';
    this.languageService.setLanguage(newLang);
    this.currentLang = newLang;
  }
}
