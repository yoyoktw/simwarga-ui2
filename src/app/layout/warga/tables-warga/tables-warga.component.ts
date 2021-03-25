import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
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
    ngOnInit() {}

  // tslint:disable-next-line: member-ordering
  wargas$: Observable<ListWarga[]>;
  // tslint:disable-next-line: member-ordering
  total$: Observable<number>;

  // tslint:disable-next-line: member-ordering
  @ViewChildren(WargaHeaderDirective) headers: QueryList<WargaHeaderDirective>;

  constructor(public service: ListWargaService) {
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

}
