import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subject, debounceTime } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/periodic-table.state';
import { loadElements, loadSuccess } from '../store/periodic-table.actions';

@Component({
  selector: 'app-filter-input',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './filter-input.component.html',
  styleUrls: [`./filter-input.component.scss`],
})
export class FilterInputComponent {
  @Output() filterChange = new EventEmitter<string>();

  private inputSubject = new Subject<string>();
  value = '';

  constructor(private store: Store<AppState>) {
    this.inputSubject.pipe(debounceTime(2000)).subscribe((value) => {
      this.filterChange.emit(value.trim().toLowerCase());
      this.store.dispatch(loadSuccess());
    });
  }

  onInputChange(value: string) {
    this.store.dispatch(loadElements());
    this.inputSubject.next(value);
  }
}
