import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PeriodicElement, PeriodicTableState } from './periodic-table.state';

export const selectPeriodicTableState =
  createFeatureSelector<PeriodicTableState>('periodicTable');

export const selectElements = createSelector(
  selectPeriodicTableState,
  (state) => state.elements
);

export const selectLoading = createSelector(
  selectPeriodicTableState,
  (state) => state.loading
);

export const selectFilter = createSelector(
  selectPeriodicTableState,
  (state) => state.filter
);

export const selectFilteredElements = createSelector(
  selectElements,
  selectFilter,
  (elements, filter) => {
    if (!filter) return elements;
    const lower = filter.toLowerCase();
    return elements.filter((e: PeriodicElement) =>
      Object.values(e).join(' ').toLowerCase().includes(lower)
    );
  }
);

export const selectCurrentPage = createSelector(
  selectPeriodicTableState,
  (state) => state.currentPage
);

export const selectPageSize = createSelector(
  selectPeriodicTableState,
  (state) => state.pageSize
);

export const selectPagedElements = createSelector(
  selectFilteredElements,
  selectCurrentPage,
  selectPageSize,
  (elements, page, size) => {
    const start = page * size;
    return elements.slice(start, start + size);
  }
);

export const selectElementsCount = createSelector(
  selectFilteredElements,
  (elements) => elements.length
);
