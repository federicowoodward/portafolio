import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ChipModule } from 'primeng/chip';
import { RouterLinkActive } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { TopButtonsComponent } from '../top-buttons/top-buttons.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    AvatarModule,
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
export class HeaderComponent {}
