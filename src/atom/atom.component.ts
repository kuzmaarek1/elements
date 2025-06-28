import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-atom',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atom.component.html',
  styleUrls: ['./atom.component.css'],
})
export class AtomComponent {
  @Input() shells: number[] = [];
  Math = Math;
  getArray(n: number): number[] {
    return Array(n);
  }
}
