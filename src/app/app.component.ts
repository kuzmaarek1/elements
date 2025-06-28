import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { Observable } from 'rxjs';

import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { FilterInputComponent } from '../filter-input/filter-input.component';
import { PeriodicTableComponent } from '../periodic-table/periodic-table.component';
import { AtomComponent } from '../atom/atom.component';
import { ReactAtomLoaderComponent } from '../react-atom-loader/react-atom-loader.component';

import { PeriodicElement } from '../store/periodic-table.state';
import {
  loadElementsSuccess, // <-- importujemy sukces zamiast loadElements
  setFilter,
  updateElement,
} from '../store/periodic-table.actions';
import {
  selectFilteredElements,
  selectLoading,
  selectFilter,
} from '../store/periodic-table.selectors';

import { Store } from '@ngrx/store';
import { PeriodicTableState } from '../store/periodic-table.state';
import { PeriodicTableService } from './services/periodic-table.service';

interface AppState {
  periodicTable: PeriodicTableState;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    EditDialogComponent,
    FilterInputComponent,
    PeriodicTableComponent,
    AtomComponent,
    ReactAtomLoaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'actions',
  ];

  elements$: Observable<PeriodicElement[]>;
  loading$: Observable<boolean>;
  filter$: Observable<string>;

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
    private periodicTableService: PeriodicTableService // <-- wstrzykujemy serwis
  ) {
    this.elements$ = this.store.select(selectFilteredElements);
    this.loading$ = this.store.select(selectLoading);
    this.filter$ = this.store.select(selectFilter);

    // Zamiast dispatchować loadElements,
    // subskrybujemy dane z serwisu i dispatchujemy loadElementsSuccess z wynikami
    this.periodicTableService.getElements().subscribe((elements: any) => {
      this.store.dispatch(loadElementsSuccess({ elements }));
    });

    this.loading$.subscribe((value) => {
      console.log('Loading state:', value);
    });
  }

  onFilterChange(value: string) {
    this.store.dispatch(setFilter({ filter: value }));
  }

  openEditDialog(element: PeriodicElement) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { ...element },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(updateElement({ element: result }));
      }
    });
  }

  getCategoryColor(category: string): string {
    switch (category) {
      case 'alkali metal':
        return '#f44336';
      case 'alkaline earth metal':
        return '#ff9800';
      case 'transition metal':
        return '#9c27b0';
      case 'post-transition metal':
        return '#3f51b5';
      case 'metalloid':
        return '#009688';
      case 'nonmetal':
        return '#4caf50';
      case 'halogen':
        return '#2196f3';
      case 'noble gas':
        return '#9e9e9e';
      default:
        return '#607d8b';
    }
  }
}
