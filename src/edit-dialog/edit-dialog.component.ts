import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { PeriodicElement } from '../app/app.component';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatInputModule],
  templateUrl: './edit-dialog.component.html',
})
export class EditDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement,
    private dialogRef: MatDialogRef<EditDialogComponent>
  ) {}

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.data);
  }
}
