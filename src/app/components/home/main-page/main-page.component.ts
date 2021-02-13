import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  scrollToCostCalculation(): void {
    const costCalculationPage = document.querySelector('#costCalculationPage');
    if (costCalculationPage) {
      costCalculationPage.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
}
