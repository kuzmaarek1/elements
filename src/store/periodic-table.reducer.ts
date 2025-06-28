import { createReducer, on } from '@ngrx/store';
import * as PeriodicTableActions from './periodic-table.actions';
import { PeriodicTableState } from './periodic-table.state';

const initialState: PeriodicTableState = {
  elements: [],
  loading: true,
  filter: '',
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
    loading: false,
  })),
  on(PeriodicTableActions.setFilter, (state, { filter }) => ({
    ...state,
    filter,
  })),
  on(PeriodicTableActions.updateElement, (state, { element }) => ({
    ...state,
    elements: state.elements.map((e) =>
      e.position === element.position ? element : e
    ),
  }))
);
