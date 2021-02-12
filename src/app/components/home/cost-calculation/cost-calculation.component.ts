import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilityService } from '../../../services/utility.service';
import { SnackbarComponent } from '../../snackbar/snackbar.component';
import { initData } from './init-data.json';
@Component({
  selector: 'app-cost-calculation',
  templateUrl: './cost-calculation.component.html',
  styleUrls: ['./cost-calculation.component.scss'],
})
export class CostCalculationComponent {
  private static readonly INPUT_REGEX_DIGIT: string = '^[0-9]+(.|,)?[0-9]*$';
  costCalculationForm: FormGroup;
  firstInputGroup: InputMetadata[] = initData.firstInputGroup;
  secondInputGroup: InputMetadata[] = initData.secondInputGroup;
  thirdInputGroup: InputMetadata[] = initData.thirdInputGroup;

  constructor(
    private formBuilder: FormBuilder,
    private utilityService: UtilityService,
    private snackbarComponent: SnackbarComponent
  ) {
    this.costCalculationForm = this.formBuilder.group({
      carPrice: [
        '',
        [
          Validators.required,
          Validators.pattern(CostCalculationComponent.INPUT_REGEX_DIGIT),
        ],
      ],
      owningPeriod: [
        '',
        [
          Validators.required,
          Validators.pattern(CostCalculationComponent.INPUT_REGEX_DIGIT),
          Validators.minLength(1),
        ],
      ],
      kmInYear: [
        '',
        [Validators.pattern(CostCalculationComponent.INPUT_REGEX_DIGIT)],
      ],
      cleanCarInYear: [
        '',
        [Validators.pattern(CostCalculationComponent.INPUT_REGEX_DIGIT)],
      ],
      cleanCarPrice: [
        '',
        [Validators.pattern(CostCalculationComponent.INPUT_REGEX_DIGIT)],
      ],
      insurancePrice: [
        '',
        [Validators.pattern(CostCalculationComponent.INPUT_REGEX_DIGIT)],
      ],
      lossOfValue: [
        '',
        [Validators.pattern(CostCalculationComponent.INPUT_REGEX_DIGIT)],
      ],
      taxYear: [
        '',
        [Validators.pattern(CostCalculationComponent.INPUT_REGEX_DIGIT)],
      ],
      fuelConsumptionKm: [
        '',
        [Validators.pattern(CostCalculationComponent.INPUT_REGEX_DIGIT)],
      ],
      avgFuelPrice: [
        '',
        [Validators.pattern(CostCalculationComponent.INPUT_REGEX_DIGIT)],
      ],
      opportunityCost: [
        '',
        [Validators.pattern(CostCalculationComponent.INPUT_REGEX_DIGIT)],
      ],
      parkplaceCost: [
        '',
        [Validators.pattern(CostCalculationComponent.INPUT_REGEX_DIGIT)],
      ],
      countInspectionsInYear: [
        '',
        [Validators.pattern(CostCalculationComponent.INPUT_REGEX_DIGIT)],
      ],
      inspectionPrice: [
        '',
        [Validators.pattern(CostCalculationComponent.INPUT_REGEX_DIGIT)],
      ],
    });
  }

  submitForm() {
    if (!this.costCalculationForm.valid) {
      this.snackbarComponent.show(
        'Alle Pflichteingaben (Preis vom Wagen und Besitzdauer) sollen gemacht werden.',
        'Error'
      );
    } else {
      const carPrice: number = this.prepareInputsValue(
        this.costCalculationForm.get('carPrice')?.value
      );
      const owningPeriod: number = this.prepareInputsValue(
        this.costCalculationForm.get('owningPeriod')?.value
      );
      const cleanCarInYear: string = this.costCalculationForm.get(
        'cleanCarInYear'
      )?.value;
      const cleanCarPrice: string = this.costCalculationForm.get(
        'cleanCarPrice'
      )?.value;
      const insurancePrice: string = this.costCalculationForm.get(
        'insurancePrice'
      )?.value;
      const lossOfValue: string = this.costCalculationForm.get('lossOfValue')
        ?.value;
      const taxYear: string = this.costCalculationForm.get('taxYear')?.value;
      const fuelConsumptionKm: string = this.costCalculationForm.get(
        'fuelConsumptionKm'
      )?.value;
      const avgFuelPrice: string = this.costCalculationForm.get('avgFuelPrice')
        ?.value;
      const opportunityCost: string = this.costCalculationForm.get(
        'opportunityCost'
      )?.value;
      const parkplaceCost: string = this.costCalculationForm.get(
        'parkplaceCost'
      )?.value;
      const countInspectionsInYear: string = this.costCalculationForm.get(
        'countInspectionsInYear'
      )?.value;
      const inspectionPrice: string = this.costCalculationForm.get(
        'inspectionPrice'
      )?.value;
    }
  }

  private prepareInputsValue(value: string): number {
    return value.indexOf(',') >= 0 ? +value.replace(',', '.') : +value;
  }
}

interface InputMetadata {
  lable: string;
  formControlName: string;
  placeholder: string;
}
