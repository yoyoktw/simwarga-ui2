import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';
import { WargaDto } from '../../../core/dto/warga.dto';
import { StorageConstants } from '../../../shared/constants/storage.constants';
import { routerTransition } from '../../../router.animations';
import { ListWargaService } from '../service/list-warga.service';
import { ListWarga } from '../util/list-warga';
import { SortEvent, WargaHeaderDirective } from '../util/warga-sortable.directive';

@Component({
    selector: 'app-tables-warga',
    templateUrl: './tables-warga.component.html',
    styleUrls: ['./tables-warga.component.scss'],
    animations: [routerTransition()],
    providers: [ListWargaService, DecimalPipe]
})
export class TablesWargaComponent implements OnInit {
  public searchForm: FormGroup;
  public isSearchKKSaja = false;
  public wargaKKList;

  ngOnInit() {}

  // tslint:disable-next-line: member-ordering
  wargas$: Observable<ListWarga[]>;
  // tslint:disable-next-line: member-ordering
  total$: Observable<number>;

  // tslint:disable-next-line: member-ordering
  @ViewChildren(WargaHeaderDirective) headers: QueryList<WargaHeaderDirective>;

  constructor(public service: ListWargaService, private router: Router, private storage: StorageMap) {
    this.searchForm = new FormGroup({
      isKKSelected: new FormControl(),
      familyGroup: new FormControl()
    });

    this.storage.get(StorageConstants.SETTINGS_WARGA_KK).subscribe((listWargaKK: WargaDto[]) => {
      if (listWargaKK) {
          this.wargaKKList = [{nomorKK: '', nama: ''}].concat(listWargaKK);
      }
    });

    this.wargas$ = service.wargas$;
    this.total$ = service.total$;
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  public onClick(id: number) {
    this.router.navigate(['/warga', id]);
  }

  public isKKSajaChange() {
    if (this.searchForm.get('isKKSelected').value) {
      this.isSearchKKSaja = true;
    }
    this.service.isKKSaja = this.isSearchKKSaja;
  }

  public getFamilyGroupLabel(wargaData: WargaDto) {
    return wargaData.nomorKK + '   ' + wargaData.nama;
  }

  public perKKChange() {
    if (this.searchForm.get('familyGroup').value && this.searchForm.get('familyGroup').value !== '') {
      this.service.familyGroup = (this.searchForm.get('familyGroup').value).id;
    }
  }

}
