import { createAction, props } from '@ngrx/store';
import { PeriodicElement } from './periodic-table.state';

export const loadElements = createAction('[Periodic Table] Load Elements');

export const loadElementsSuccess = createAction(
  '[Periodic Table] Load Elements Success',
  props<{ elements: PeriodicElement[] }>()
);

export const loadSuccess = createAction('[Periodic Table] Success Elements');

export const setFilter = createAction(
  '[Periodic Table] Set Filter',
  props<{ filter: string }>()
);
export const updateElement = createAction(
  '[Periodic Table] Update Element',
  props<{ element: PeriodicElement }>()
);

export const setCurrentPage = createAction(
  '[PagignationTable] Set Current Page',
  props<{ page: number }>()
);

export const setPageSize = createAction(
  '[PagignationTable] Set Page Size',
  props<{ size: number }>()
);
