import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilityService } from '../../../services/utility.service';

@Component({
  selector: 'app-cost-calculation',
  templateUrl: './cost-calculation.component.html',
  styleUrls: ['./cost-calculation.component.scss']
})
export class CostCalculationComponent {
  costCalculationForm: FormGroup;

  private static readonly INPUT_REGEX_DIGIT: string = '^[0-9]+(.|,)?[0-9]*$';
  
  constructor(private formBuilder: FormBuilder,
    private utilityService: UtilityService) {
    this.costCalculationForm = this.formBuilder.group({
      carPrice: ['', [Validators.required, Validators.pattern(CostCalculationComponent.INPUT_REGEX_DIGIT)]],
      owningPeriod: ['', 
        [
          Validators.required, 
          Validators.pattern(CostCalculationComponent.INPUT_REGEX_DIGIT), 
          Validators.minLength(1)
        ]
      ],
      kmInYear: ['', [Validators.pattern(CostCalculationComponent.INPUT_REGEX_DIGIT)]],
      cleanCarInYear: ['', [Validators.pattern(CostCalculationComponent.INPUT_REGEX_DIGIT)]],
      cleanCarPrice: ['', [Validators.pattern(CostCalculationComponent.INPUT_REGEX_DIGIT)]],
      insurancePrice: ['', [Validators.pattern(CostCalculationComponent.INPUT_REGEX_DIGIT)]],
      lossOfValue: ['', [Validators.pattern(CostCalculationComponent.INPUT_REGEX_DIGIT)]],
      taxYear: ['', [Validators.pattern(CostCalculationComponent.INPUT_REGEX_DIGIT)]],
      fuelConsumptionKm: ['', [Validators.pattern(CostCalculationComponent.INPUT_REGEX_DIGIT)]],
      opportunityCost: ['', [Validators.pattern(CostCalculationComponent.INPUT_REGEX_DIGIT)]],
      parkplaceCost: ['', [Validators.pattern(CostCalculationComponent.INPUT_REGEX_DIGIT)]],
      countInspectionsInYear: ['', [Validators.pattern(CostCalculationComponent.INPUT_REGEX_DIGIT)]],
      inspectionPrice: ['', [Validators.pattern(CostCalculationComponent.INPUT_REGEX_DIGIT)]]
    });
   }

   submitForm() {
     
   }

}
