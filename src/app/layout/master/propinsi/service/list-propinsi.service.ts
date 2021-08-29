import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import { StorageMap } from '@ngx-pwa/local-storage';
import { StorageConstants } from '../../../../shared/constants/storage.constants';
import { SortColumn, SortDirection } from '../util/propinsi-sortable.directive';
import { ListPropinsi } from '../util/list-propinsi';

interface SearchResult {
  propinsis: ListPropinsi[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(propinsis: ListPropinsi[], column: SortColumn, direction: string): ListPropinsi[] {
  if (direction === '' || column === '') {
    return propinsis;
  } else {
    return [...propinsis].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(propinsis: ListPropinsi, term: string, pipe: PipeTransform) {
    return propinsis.nama.toLowerCase().includes(term.toLowerCase())
    || propinsis.code.toLowerCase().includes(term.toLowerCase());
}

@Injectable({providedIn: 'root'})
export class ListPropinsiService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _propinsis$ = new BehaviorSubject<ListPropinsi[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _propinsiList;

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe, private storage: StorageMap) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._propinsis$.next(result.propinsis);
      this._total$.next(result.total);
    });

    this._search$.next();

    this.storage.get(StorageConstants.SETTINGS_PROPINSI).subscribe((propinsis: ListPropinsi[]) => {
        this._propinsiList = propinsis;
        // console.log(this._tipeList);
    });
  }

  get propinsis$() { return this._propinsis$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    if (this._propinsiList) {
    // 1. sort
    let propinsis = sort(this._propinsiList, sortColumn, sortDirection);

    // 2. filter
    propinsis = propinsis.filter(propinsi => matches(propinsi, searchTerm, this.pipe));
    const total = propinsis.length;

    // 3. paginate
    propinsis = propinsis.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({propinsis, total});
    }
  }
}
