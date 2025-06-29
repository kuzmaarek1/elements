import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PeriodicElement } from '../store/periodic-table.state';
import {
  CustomSnackBarComponent,
  CustomSnackBarData,
} from '../custom-snack-bar/custom-snack-bar.component';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    CustomSnackBarComponent,
  ],
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement,
    private dialogRef: MatDialogRef<EditDialogComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      name: [data.name, Validators.required],
      weight: [data.weight, [Validators.required, Validators.min(0)]],
      symbol: [data.symbol, Validators.required],
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    if (this.form.valid) {
      const updatedElement = {
        ...this.data,
        ...this.form.value,
      };

      this.snackBar.openFromComponent(CustomSnackBarComponent, {
        data: {
          message: 'Element został pomyślnie zaktualizowany!',
          color: this.data.backgroundColor,
          icon: 'done',
        } as CustomSnackBarData,
        duration: 3000,
      });

      this.dialogRef.close(updatedElement);
    } else {
      this.showValidationErrors();
    }
  }

  private showValidationErrors() {
    const errors: string[] = [];

    if (this.form.get('name')?.hasError('required')) {
      errors.push('Name is required.');
    }
    if (this.form.get('weight')?.hasError('required')) {
      errors.push('Weight is required.');
    }
    if (this.form.get('weight')?.hasError('min')) {
      errors.push('Weight must be ≥ 0.');
    }
    if (this.form.get('symbol')?.hasError('required')) {
      errors.push('Symbol is required.');
    }

    if (errors.length) {
      this.snackBar.openFromComponent(CustomSnackBarComponent, {
        data: {
          message: errors.join(' '),
          color: this.data.backgroundColor,
          icon: 'error',
        } as CustomSnackBarData,
        duration: 3000,
      });
    }
  }
}
