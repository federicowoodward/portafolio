import { Component, AfterViewInit } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { ScrollService } from './core/scroll.service';
import { RouterOutlet } from '@angular/router';
import { fadeAnimation } from './shared/route-animations';
import { FooterComponent } from './shared/components/footer/footer.component';

import { ToastService } from './core/toast.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  providers: [ToastService, MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [fadeAnimation],
})
export class AppComponent implements AfterViewInit {
  constructor(private scrollService: ScrollService) {}
  title = 'portafolio-angular';
  showFooter = true;

  ngAfterViewInit(): void {}

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }

  onStart() {
    this.showFooter = false;
  }

  onDone() {
    this.showFooter = true;
  }
}
