import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilityService } from '../../../services/utility.service';
import { SnackbarComponent } from '../../snackbar/snackbar.component';

@Component({
  selector: 'app-cost-calculation',
  templateUrl: './cost-calculation.component.html',
  styleUrls: ['./cost-calculation.component.scss']
})
export class CostCalculationComponent {
  private static readonly INPUT_REGEX_DIGIT: string = '^[0-9]+(.|,)?[0-9]*$';
  costCalculationForm: FormGroup;
  firstInputGroup: InputMetadata[] =
    [
      {
        lable: "Preis vom Wagen",
        formControlName: "carPrice",
        placeholder: "Preis in Euro"
      },
      {
        lable: "Besitzdauer (voraussichtlich)",
        formControlName: "owningPeriod",
        placeholder: "Besitzdauer in Jahren"
      },
      {
        lable: "Jährliche Fahrleistung (km.)",
        formControlName: "kmInYear",
        placeholder: "Gefahrene km. pro Jahr"
      },
      {
        lable: "Anzahl der Autowäschen pro Jahr",
        formControlName: "cleanCarInYear",
        placeholder: "Anzahl der Autowäschen"
      },
      {
        lable: "∅ Preis für eine Autowäsche",
        formControlName: "cleanCarPrice",
        placeholder: "∅ Preis für eine Autowäsche"
      }
    ];
  secondInputGroup: InputMetadata[] =
    [
      {
        lable: "Wertverlüst pro Jahr",
        formControlName: "lossOfValue",
        placeholder: "∅ Wertverlüst pro Jahr in %"
      },
      {
        lable: "Versicherungskosten pro Jahr",
        formControlName: "insurancePrice",
        placeholder: "Versicherungskosten in Euro"
      },
      {
        lable: "Steuersatz pro Jahr",
        formControlName: "taxYear",
        placeholder: "Steuersatz in Euro"
      },
      {
        lable: "∅ Kraffstoffverbrauch pro km.",
        formControlName: "fuelConsumptionKm",
        placeholder: "Kraffstoffverbrauch pro km."
      },
      {
        lable: "∅ Kraffstoffpreis für l.",
        formControlName: "avgFuelPrice",
        placeholder: "Kraffstoffpreis Euro für liter"
      }
    ];
  thirdInputGroup: InputMetadata[] =
    [
      {
        lable: "Opportunitätskosten",
        formControlName: "opportunityCost",
        placeholder: "Opportunitätskosten in %"
      },
      {
        lable: "∅ Parkplatzskosten in Monat",
        formControlName: "parkplaceCost",
        placeholder: "Parkplatzskosten in Euro"
      },
      {
        lable: "Anzahl der Inspektionen pro Jahr",
        formControlName: "countInspectionsInYear",
        placeholder: "Anzahl der Inspektionen pro Jahr"
      },
      {
        lable: "Preis für eine Inspektion",
        formControlName: "inspectionPrice",
        placeholder: "Preis für eine Inspektion in Euro"
      }
    ];
  
  constructor(private formBuilder: FormBuilder,
    private utilityService: UtilityService,
    private snackbarComponent: SnackbarComponent) {
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
      avgFuelPrice: ['', [Validators.pattern(CostCalculationComponent.INPUT_REGEX_DIGIT)]],
      opportunityCost: ['', [Validators.pattern(CostCalculationComponent.INPUT_REGEX_DIGIT)]],
      parkplaceCost: ['', [Validators.pattern(CostCalculationComponent.INPUT_REGEX_DIGIT)]],
      countInspectionsInYear: ['', [Validators.pattern(CostCalculationComponent.INPUT_REGEX_DIGIT)]],
      inspectionPrice: ['', [Validators.pattern(CostCalculationComponent.INPUT_REGEX_DIGIT)]]
    });
   }

   submitForm() {
    if (!this.costCalculationForm.valid) {
      this.snackbarComponent.show("Alle Pflichteingaben (Preis vom Wagen und Besitzdauer) sollen gemacht werden.", "Error");
    } else {
      const carPrice: string = this.costCalculationForm.get('carPrice')?.value;
      const preparedCarPrice: number = this.prepareInputsValue(carPrice);
      
    }
   }

   private prepareInputsValue(value: string): number {
    return value.indexOf(',') >= 0 ? +value.replace(',', '.') : +value;
   }

}

interface InputMetadata {
  lable: string,
  formControlName: string,
  placeholder: string
}