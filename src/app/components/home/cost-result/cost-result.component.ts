import { Component, Input } from '@angular/core';
import { CalculationResult } from '../cost-calculation/cost-calculation.component';

@Component({
  selector: 'app-cost-result',
  templateUrl: './cost-result.component.html',
  styleUrls: ['./cost-result.component.scss'],
})
export class CostResultComponent {
  @Input('calculResult') calculResult: CalculationResult = {
    kmCost: 0,
    monthCost: 0,
    totalCost: 0,
    yearCost: 0,
  };
}
