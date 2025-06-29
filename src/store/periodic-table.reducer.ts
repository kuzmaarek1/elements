import { createReducer, on } from '@ngrx/store';
import * as PeriodicTableActions from './periodic-table.actions';
import { PeriodicTableState } from './periodic-table.state';

const initialState: PeriodicTableState = {
  elements: [],
  loading: true,
  filter: '',
  currentPage: 0,
  pageSize: 5,
  elementsCount: 0,
};

export const periodicTableReducer = createReducer(
  initialState,
  on(PeriodicTableActions.loadElements, (state) => ({
    ...state,
    loading: true,
  })),
  on(PeriodicTableActions.loadElementsSuccess, (state, { elements }) => ({
    ...state,
    elements,
    elementsCount: elements.length - 1,
    currentPage: 0,
    pageSize: 5,
    loading: false,
  })),
  on(PeriodicTableActions.loadSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(PeriodicTableActions.setFilter, (state, { filter }) => ({
    ...state,
    currentPage: 0,
    pageSize: 5,
    filter,
  })),
  on(PeriodicTableActions.updateElement, (state, { element }) => ({
    ...state,
    currentPage: 0,
    pageSize: 5,
    elements: state.elements.map((e) =>
      e.position === element.position ? element : e
    ),
  })),
  on(PeriodicTableActions.setCurrentPage, (state, { page }) => ({
    ...state,
    currentPage: page,
  })),

  on(PeriodicTableActions.setPageSize, (state, { size }) => ({
    ...state,
    pageSize: size,
  }))
);
