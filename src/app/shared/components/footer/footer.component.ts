import { Component, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { ContactComponent } from '../contact/contact.component';
import { DividerModule } from 'primeng/divider';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-footer',
  imports: [ ContactComponent, DividerModule, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const car = document.querySelector('.car') as HTMLElement;
    const container = document.querySelector('.car-container') as HTMLElement;

    const containerWidth = container.offsetWidth;
    const carWidth = car.offsetWidth;

    const maxX = containerWidth - 120;

    gsap.to(car, {
      x: maxX,
      duration: 2.5,
      ease: 'expo.inOut',
      repeat: -1,
      yoyo: true,
      onRepeat: () => {
        const currentScale = gsap.getProperty(car, 'scaleX') as number;
        gsap.set(car, { scaleX: currentScale * -1 });
      },
    });
  }
}
