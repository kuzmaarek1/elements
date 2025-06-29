import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { FilterInputComponent } from '../filter-input/filter-input.component';
import { ReactAtomLoaderComponent } from '../react-atom-loader/react-atom-loader.component';
import { PeriodicElement } from '../store/periodic-table.state';
import { AppState } from '../store/periodic-table.state';
import { PeriodicTableService } from './services/periodic-table.service';
import { CATEGORY_COLORS } from '../constants/index';
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

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatGridListModule,
    MatIconModule,
    EditDialogComponent,
    FilterInputComponent,
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

    this.periodicTableService.getElements().subscribe((elements: any) => {
      this.store.dispatch(loadElementsSuccess({ elements }));
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
  getCols(): number {
    const width = window.innerWidth;
    if (width < 500) return 1;
    if (width < 900) return 2;
    if (width < 1200) return 3;
    return 4;
  }
}
