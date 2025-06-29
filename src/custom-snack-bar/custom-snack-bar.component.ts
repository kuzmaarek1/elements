import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export interface CustomSnackBarData {
  message: string;
  icon?: string;
  color?: string;
}
@Component({
  selector: 'app-custom-snack-bar',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './custom-snack-bar.component.html',
  styleUrls: ['./custom-snack-bar.component.scss'],
})
export class CustomSnackBarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: CustomSnackBarData) {}
}
