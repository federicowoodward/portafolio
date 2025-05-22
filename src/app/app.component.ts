import { Component, AfterViewInit } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { ScrollService } from './core/scroll.service';
import { RouterOutlet } from '@angular/router';
import AOS from 'aos';
import { fadeAnimation } from './shared/route-animations';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [fadeAnimation],
})
export class AppComponent implements AfterViewInit {
  constructor(private scrollService: ScrollService) {}
  title = 'portafolio-angular';

  ngAfterViewInit(): void {}

  prepareRoute(outlet: any) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
