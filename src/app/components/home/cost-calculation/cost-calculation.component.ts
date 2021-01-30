import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cost-calculation',
  templateUrl: './cost-calculation.component.html',
  styleUrls: ['./cost-calculation.component.scss']
})
export class CostCalculationComponent {
  costCalculationForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder) {
    this.costCalculationForm = this.formBuilder.group({
      carPrice: [''],
      owningPeriod: [''],
      kmInYear: [''],
      cleanCarInYear: [''],
      cleanCarPrice: [''],
      insurancePrice: [''],
      lossOfValue: [''],
      taxYear: [''],
      fuelConsumptionKm: [''],
      opportunityCost: [''],
      parkplaceCost: [''],
      countInspectionsInYear: [''],
      inspectionPrice: ['']
    });
   }

   submitForm() {
     
   }

}
