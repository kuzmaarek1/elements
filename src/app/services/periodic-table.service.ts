import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ELEMENT_DATA } from '../../constants';

@Injectable({ providedIn: 'root' })
export class PeriodicTableService {
  getElements() {
    return of(ELEMENT_DATA).pipe(delay(2000));
  }
}
