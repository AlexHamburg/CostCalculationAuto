import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  @Output() calculationResult = new EventEmitter<CalculationResult>();

  constructor(
    private formBuilder: FormBuilder,
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
      const carPrice: number = this.prepareInputsReqValue(
        this.costCalculationForm.get('carPrice')?.value
      );
      const owningPeriod: number = this.prepareInputsReqValue(
        this.costCalculationForm.get('owningPeriod')?.value
      );
      const kmInYear: number = this.costCalculationForm.get('kmInYear')?.value;
      const cleanCarInYear: number = this.prepareInputsValue(
        this.costCalculationForm.get('cleanCarInYear')?.value
      );
      const cleanCarPrice: number = this.prepareInputsValue(
        this.costCalculationForm.get('cleanCarPrice')?.value
      );
      const insurancePrice: number = this.prepareInputsValue(
        this.costCalculationForm.get('insurancePrice')?.value
      );
      const lossOfValue: number = this.prepareInputsValue(
        this.costCalculationForm.get('lossOfValue')?.value
      );
      const taxYear: number = this.prepareInputsValue(
        this.costCalculationForm.get('taxYear')?.value
      );
      const fuelConsumptionKm: number = this.prepareInputsValue(
        this.costCalculationForm.get('fuelConsumptionKm')?.value
      );
      const avgFuelPrice: number = this.prepareInputsValue(
        this.costCalculationForm.get('avgFuelPrice')?.value
      );
      const opportunityCost: number = this.prepareInputsValue(
        this.costCalculationForm.get('opportunityCost')?.value
      );
      const parkplaceCost: number = this.prepareInputsValue(
        this.costCalculationForm.get('parkplaceCost')?.value
      );
      const countInspectionsInYear: number = this.prepareInputsValue(
        this.costCalculationForm.get('countInspectionsInYear')?.value
      );
      const inspectionPrice: number = this.prepareInputsValue(
        this.costCalculationForm.get('inspectionPrice')?.value
      );
      const result: CalculationResult = this.calculateCosts({
        carPrice: carPrice,
        owningPeriod: owningPeriod,
        kmInYear: kmInYear,
        cleanCarInYear: cleanCarInYear,
        cleanCarPrice: cleanCarPrice,
        insurancePrice: insurancePrice,
        lossOfValue: lossOfValue,
        taxYear: taxYear,
        fuelConsumptionKm: fuelConsumptionKm,
        avgFuelPrice: avgFuelPrice,
        opportunityCost: opportunityCost,
        parkplaceCost: parkplaceCost,
        countInspectionsInYear: countInspectionsInYear,
        inspectionPrice: inspectionPrice,
      });
      this.calculationResult.emit(result);
      this.scrollToresultsPage();
    }
  }

  private calculateCosts(inputData: InputData): CalculationResult {
    const totalCost: number = this.calculateTotalCost(inputData);
    return {
      totalCost: Math.round(totalCost),
      monthCost: Math.round(totalCost / (inputData.owningPeriod * 12)),
      yearCost:
        inputData.owningPeriod >= 1
          ? Math.round(totalCost / inputData.owningPeriod)
          : totalCost,
      kmCost: inputData.kmInYear
        ? Math.round((totalCost / inputData.owningPeriod) * inputData.kmInYear)
        : 0,
    };
  }

  private calculateTotalCost(inputData: InputData): number {
    return (
      inputData.carPrice +
      inputData.cleanCarInYear * inputData.cleanCarPrice +
      inputData.insurancePrice * inputData.owningPeriod +
      inputData.lossOfValue * inputData.carPrice +
      inputData.taxYear * inputData.owningPeriod +
      inputData.fuelConsumptionKm *
        inputData.avgFuelPrice *
        inputData.owningPeriod *
        inputData.kmInYear +
      inputData.opportunityCost * inputData.carPrice * inputData.owningPeriod +
      inputData.parkplaceCost * inputData.owningPeriod * 12 +
      inputData.countInspectionsInYear *
        inputData.inspectionPrice *
        inputData.owningPeriod
    );
  }

  private prepareInputsReqValue(value: string): number {
    return value.indexOf(',') >= 0 ? +value.replace(',', '.') : +value;
  }

  private prepareInputsValue(value: string): number {
    if (value) {
      return value.indexOf(',') >= 0 ? +value.replace(',', '.') : +value;
    } else {
      return 0;
    }
  }

  private scrollToresultsPage(): void {
    const costCalculationResultPage = document.querySelector('#costResultPage');
    if (costCalculationResultPage) {
      costCalculationResultPage.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
}

type InputMetadata = {
  lable: string;
  formControlName: string;
  placeholder: string;
};

type InputData = {
  carPrice: number;
  owningPeriod: number;
  kmInYear: number;
  cleanCarInYear: number;
  cleanCarPrice: number;
  insurancePrice: number;
  lossOfValue: number;
  taxYear: number;
  fuelConsumptionKm: number;
  avgFuelPrice: number;
  opportunityCost: number;
  parkplaceCost: number;
  countInspectionsInYear: number;
  inspectionPrice: number;
};

export type CalculationResult = {
  kmCost: number;
  monthCost: number;
  yearCost: number;
  totalCost: number;
};
