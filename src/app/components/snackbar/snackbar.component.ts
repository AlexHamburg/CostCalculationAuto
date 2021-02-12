import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarComponent {
  constructor(public snackBar: MatSnackBar) {}

  show(message: string, type: string, duration?: any) {
    this.snackBar.open(message, type, {
      duration: duration ? duration : 2000,
      panelClass: [type],
    });
  }
}
