import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { PeriodicTableComponent } from '../periodic-table/periodic-table.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FilterInputComponent } from '../filter-input/filter-input.component';
import { CommonModule } from '@angular/common';

export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    EditDialogComponent,
    FilterInputComponent,
    PeriodicTableComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'actions',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>();

  filterValue = '';
  isLoading = true;

  constructor(private dialog: MatDialog, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = Object.values(data).join(' ').toLowerCase();
      return dataStr.includes(filter);
    };

    new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
      this.dataSource.data = ELEMENT_DATA;
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  onFilterChange(value: string) {
    this.filterValue = value;
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  openEditDialog(element: PeriodicElement) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { ...element },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.dataSource.data.findIndex(
          (e) => e.position === result.position
        );
        if (index > -1) {
          this.dataSource.data[index] = result;
          this.dataSource._updateChangeSubscription();
        }
      }
    });
  }
}
