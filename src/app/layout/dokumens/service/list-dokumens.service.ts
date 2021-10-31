import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject, timer} from 'rxjs';

import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, takeUntil, tap} from 'rxjs/operators';
import { StorageMap } from '@ngx-pwa/local-storage';
import { StorageConstants } from '../../../shared/constants/storage.constants';
import { ListDokumen } from '../util/list-dokumens';
import { SortColumn, SortDirection } from '../util/dokumens-sortable.directive';
import { DokumenDto } from '../../../core/dto/dokumen.dto';

interface SearchResult {
  dokumens: ListDokumen[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  isKKSaja: boolean;
  familyGroup: string;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(dokumens: ListDokumen[], column: SortColumn, direction: string): ListDokumen[] {
  if (direction === '' || column === '') {
    return dokumens;
  } else {
    return [...dokumens].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(dokumen: ListDokumen, term: string, pipe: PipeTransform) {
    return dokumen.nomorKK.toLowerCase().includes(term.toLowerCase())
    || dokumen.nama.toLowerCase().includes(term.toLowerCase())
    || dokumen.createdOn.toLowerCase().includes(term.toLowerCase())
    || dokumen.tipe.toLowerCase().includes(term.toLowerCase());
}

@Injectable({providedIn: 'root'})
export class ListDokumenService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _listDokumen$ = new BehaviorSubject<ListDokumen[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _dokumenList;

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
    isKKSaja: false,
    familyGroup: ''
  };

  constructor(private pipe: DecimalPipe, private storage: StorageMap) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._listDokumen$.next(result.dokumens);
      this._total$.next(result.total);
    });

    this._search$.next();

    this.storage.get(StorageConstants.SETTINGS_DOKUMEN).pipe(takeUntil(timer(5000))).subscribe((daftarDokumen: DokumenDto[]) => {
        this._dokumenList = daftarDokumen;
    });
  }

  get dokumens$() { return this._listDokumen$.asObservable(); }
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
//   set isKKSaja(isKKSaja: boolean) { this._set({isKKSaja}); }
//   set familyGroup(familyGroup: string) { this._set({familyGroup}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm, isKKSaja, familyGroup} = this._state;

    // 1. sort
    let dokumens = sort(this._dokumenList, sortColumn, sortDirection);

    // 2. filter
    dokumens = dokumens.filter(dokumen => matches(dokumen, searchTerm, this.pipe));
    // if (isKKSaja) {
    //     dokumens = dokumens.filter(warga => warga.isKK.toString() === isKKSaja.toString());
    // }
    // if (familyGroup) {
    //     dokumens = dokumens.filter(warga => warga.familyGroup === familyGroup);
    // }
    const total = dokumens.length;

    // 3. paginate
    dokumens = dokumens.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({dokumens, total});
  }
}
