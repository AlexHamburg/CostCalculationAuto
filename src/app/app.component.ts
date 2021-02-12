import { Component, Input } from '@angular/core';
import { CalculationResult } from './components/home/cost-calculation/cost-calculation.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  calculResult: CalculationResult = {
    kmCost: 0,
    monthCost: 0,
    yearCost: 0,
    totalCost: 0,
  };

  title = 'cost-calculation-auto';

  receiveCalculResult(calculationResult: CalculationResult) {
    this.calculResult = calculationResult;
  }
}
