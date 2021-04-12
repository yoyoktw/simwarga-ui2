import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { routerTransition } from '../../../../router.animations';
import { ListRTService } from '../service/list-rt.service';
import { ListRT } from '../util/list-rt';
import { RTHeaderDirective, SortEvent } from '../util/rt-sortable.directive';

@Component({
  selector: 'app-rt-propinsi',
  templateUrl: './list-rt.component.html',
  styleUrls: ['./list-rt.component.css'],
  animations: [routerTransition()],
  providers: [ListRTService, DecimalPipe]
})
export class ListRTComponent implements OnInit {

    ngOnInit(): void {
    }

    // tslint:disable-next-line: member-ordering
    itemList$: Observable<ListRT[]>;
    // tslint:disable-next-line: member-ordering
    total$: Observable<number>;

    // tslint:disable-next-line: member-ordering
    @ViewChildren(RTHeaderDirective) headers: QueryList<RTHeaderDirective>;

    constructor(public service: ListRTService) {
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
