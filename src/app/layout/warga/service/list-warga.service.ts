import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortColumn, SortDirection} from '../util/warga-sortable.directive';
import { StorageMap } from '@ngx-pwa/local-storage';
import { ListWarga } from '../util/list-warga';
import { StorageConstants } from '../../../shared/constants/storage.constants';
import { WargaDto } from '../../../core/dto/warga.dto';

interface SearchResult {
  wargas: ListWarga[];
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

function sort(tipes: ListWarga[], column: SortColumn, direction: string): ListWarga[] {
  if (direction === '' || column === '') {
    return tipes;
  } else {
    return [...tipes].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(warga: ListWarga, term: string, pipe: PipeTransform) {
    return warga.nik.toLowerCase().includes(term.toLowerCase())
    || warga.nama.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(warga.rt).includes(term)
    || warga.email.toLowerCase().includes(term.toLowerCase());
}

@Injectable({providedIn: 'root'})
export class ListWargaService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _listWarga$ = new BehaviorSubject<ListWarga[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _wargaList;

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
      this._listWarga$.next(result.wargas);
      this._total$.next(result.total);
    });

    this._search$.next();

    this.storage.get(StorageConstants.SETTINGS_WARGA).subscribe((daftarWarga: WargaDto[]) => {
        this._wargaList = daftarWarga;
        // console.log(this._tipeList);
    });
  }

  get wargas$() { return this._listWarga$.asObservable(); }
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

    // 1. sort
    let wargas = sort(this._wargaList, sortColumn, sortDirection);

    // 2. filter
    wargas = wargas.filter(warga => matches(warga, searchTerm, this.pipe));
    const total = wargas.length;

    // 3. paginate
    wargas = wargas.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({wargas, total});
  }
}
