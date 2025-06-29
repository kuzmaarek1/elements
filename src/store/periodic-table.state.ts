export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
  category: string;
  backgroundColor?: string;
}

export interface PeriodicTableState {
  elements: PeriodicElement[];
  currentPage: number;
  pageSize: number;
  elementsCount?: number;
  loading: boolean;
  filter: string;
}
