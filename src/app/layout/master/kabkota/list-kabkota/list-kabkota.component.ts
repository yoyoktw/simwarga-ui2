import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { routerTransition } from '../../../../router.animations';
import { ListKabkotaService } from '../service/list-kabkota.service';
import { KabkotaHeaderDirective, SortEvent } from '../util/kabkota-sortable.directive';
import { ListKabkota } from '../util/list-kabkota';

@Component({
  selector: 'app-list-kabkota',
  templateUrl: './list-kabkota.component.html',
  styleUrls: ['./list-kabkota.component.css'],
  animations: [routerTransition()],
  providers: [ListKabkotaService, DecimalPipe]
})
export class ListKabkotaComponent implements OnInit {

    ngOnInit(): void {
    }

    // tslint:disable-next-line: member-ordering
    itemList$: Observable<ListKabkota[]>;
    // tslint:disable-next-line: member-ordering
    total$: Observable<number>;

    // tslint:disable-next-line: member-ordering
    @ViewChildren(KabkotaHeaderDirective) headers: QueryList<KabkotaHeaderDirective>;

    constructor(public service: ListKabkotaService) {
      this.itemList$ = service.itemList$;
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
