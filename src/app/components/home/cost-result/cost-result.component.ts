import { Component, Input } from '@angular/core';
import { jsPDF } from 'jspdf';
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

  exportPDF(): void {
    var doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('Ergebnis:', 20, 20);
    doc.setFontSize(16);
    doc.text(`Kosten pro km.: ${this.calculResult.kmCost}`, 20, 60);
    doc.text(`Kosten pro Monat: ${this.calculResult.monthCost}`, 20, 80);
    doc.text(`Kosten pro Jahr: ${this.calculResult.yearCost}`, 20, 100);
    doc.text(`Gesamtkosten: ${this.calculResult.totalCost}`, 20, 120);
    doc.save('data.pdf');
  }
}
