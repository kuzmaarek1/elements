import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
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
  loadElementsSuccess,
  setFilter,
  setCurrentPage,
  setPageSize,
  updateElement,
} from '../store/periodic-table.actions';
import {
  selectFilteredElements,
  selectLoading,
  selectFilter,
  selectPagedElements,
  selectElementsCount,
  selectCurrentPage,
  selectPageSize,
} from '../store/periodic-table.selectors';

import { Store } from '@ngrx/store';
import { PeriodicTableState } from '../store/periodic-table.state';
import { PeriodicTableService } from './services/periodic-table.service';
import { CATEGORY_COLORS } from '../constants/index';

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
    MatPaginatorModule,
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

  pagedElements$: Observable<PeriodicElement[]>;
  elementsCount$: Observable<number>;
  currentPage$: Observable<number>;
  pageSize$: Observable<number>;

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
    private periodicTableService: PeriodicTableService
  ) {
    this.elements$ = this.store.select(selectFilteredElements);
    this.loading$ = this.store.select(selectLoading);
    this.filter$ = this.store.select(selectFilter);
    this.pagedElements$ = this.store.select(selectPagedElements);
    this.elementsCount$ = this.store.select(selectElementsCount);
    this.currentPage$ = this.store.select(selectCurrentPage);
    this.pageSize$ = this.store.select(selectPageSize);

    console.log(this.elementsCount$);
    this.periodicTableService.getElements().subscribe((elements: any) => {
      this.store.dispatch(loadElementsSuccess({ elements }));
    });

    this.loading$.subscribe((value) => {
      console.log('Loading state:', value);
    });
    this.elementsCount$.subscribe((value) => {
      console.log('Loading state:', value);
    });
  }

  onPageChange(event: any) {
    this.store.dispatch(setCurrentPage({ page: event.pageIndex }));
    this.store.dispatch(setPageSize({ size: event.pageSize }));
  }

  onFilterChange(value: string) {
    this.store.dispatch(setFilter({ filter: value }));
  }

  openEditDialog(element: PeriodicElement) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {
        ...element,
        backgroundColor: this.getCategoryColor(element.category),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(updateElement({ element: result }));
      }
    });
  }
  getCategoryColor(category: string): string {
    return CATEGORY_COLORS[category] || '#78909c';
  }
}
