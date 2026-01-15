import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-github-card',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './github-card.component.html',
})
export class GithubCardComponent {
  @Input() fullName = '';
  @Input() description = '';
  @Input() avatarUrl = '';
  @Input() htmlUrl = '';
}
