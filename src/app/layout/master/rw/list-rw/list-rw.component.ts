import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { routerTransition } from '../../../../router.animations';
import { ListRWService } from '../service/list-rw.service';
import { ListRW } from '../util/list-rw';
import { RWHeaderDirective, SortEvent } from '../util/rw-sortable.directive';

@Component({
  selector: 'app-rw-propinsi',
  templateUrl: './list-rw.component.html',
  styleUrls: ['./list-rw.component.css'],
  animations: [routerTransition()],
  providers: [ListRWService, DecimalPipe]
})
export class ListRWComponent implements OnInit {

    ngOnInit(): void {
    }

    // tslint:disable-next-line: member-ordering
    itemList$: Observable<ListRW[]>;
    // tslint:disable-next-line: member-ordering
    total$: Observable<number>;

    // tslint:disable-next-line: member-ordering
    @ViewChildren(RWHeaderDirective) headers: QueryList<RWHeaderDirective>;

    constructor(public service: ListRWService) {
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
