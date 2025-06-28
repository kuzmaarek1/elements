export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
  category: string;
}

export interface PeriodicTableState {
  elements: PeriodicElement[];
  loading: boolean;
  filter: string;
}
