import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { routerTransition } from '../../../../router.animations';
import { ListDesaService } from '../service/list-desa.service';
import { DesaHeaderDirective, SortEvent } from '../util/desa-sortable.directive';
import { ListDesa } from '../util/list-desa';

@Component({
  selector: 'app-desa-propinsi',
  templateUrl: './list-desa.component.html',
  styleUrls: ['./list-desa.component.css'],
  animations: [routerTransition()],
  providers: [ListDesaService, DecimalPipe]
})
export class ListDesaComponent implements OnInit {

    ngOnInit(): void {
    }

    // tslint:disable-next-line: member-ordering
    itemList$: Observable<ListDesa[]>;
    // tslint:disable-next-line: member-ordering
    total$: Observable<number>;

    // tslint:disable-next-line: member-ordering
    @ViewChildren(DesaHeaderDirective) headers: QueryList<DesaHeaderDirective>;

    constructor(public service: ListDesaService) {
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
