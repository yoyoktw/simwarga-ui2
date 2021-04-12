import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import { StorageMap } from '@ngx-pwa/local-storage';
import { StorageConstants } from '../../../../shared/constants/storage.constants';
import { ListRW } from '../util/list-rw';
import { SortColumn, SortDirection } from '../util/rw-sortable.directive';

interface SearchResult {
  itemList: ListRW[];
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

function sort(itemList: ListRW[], column: SortColumn, direction: string): ListRW[] {
  if (direction === '' || column === '') {
    return itemList;
  } else {
    return [...itemList].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(itemList: ListRW, term: string, pipe: PipeTransform) {
    return itemList.nama.toLowerCase().includes(term.toLowerCase()) || pipe.transform(itemList.desa).includes(term);
}

@Injectable({providedIn: 'root'})
export class ListRWService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _itemList$ = new BehaviorSubject<ListRW[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _items;

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
      this._itemList$.next(result.itemList);
      this._total$.next(result.total);
    });

    this._search$.next();

    this.storage.get(StorageConstants.SETTINGS_RW).subscribe((listRW: ListRW[]) => {
        this._items = listRW;
        // console.log(this._tipeList);
    });
  }

  get itemList$() { return this._itemList$.asObservable(); }
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

    if (this._items) {
        // 1. sort
        let itemList = sort(this._items, sortColumn, sortDirection);

        // 2. filter
        itemList = itemList.filter(item => matches(item, searchTerm, this.pipe));
        const total = itemList.length;

        // 3. paginate
        itemList = itemList.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return of({itemList, total});
    }
  }
}
