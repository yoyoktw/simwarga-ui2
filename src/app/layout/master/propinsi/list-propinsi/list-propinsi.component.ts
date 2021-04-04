import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { routerTransition } from '../../../../router.animations';
import { ListPropinsiService } from '../service/list-propinsi.service';
import { ListPropinsi } from '../util/list-propinsi';
import { PropinsiHeaderDirective, SortEvent } from '../util/propinsi-sortable.directive';

@Component({
  selector: 'app-list-propinsi',
  templateUrl: './list-propinsi.component.html',
  styleUrls: ['./list-propinsi.component.css'],
  animations: [routerTransition()],
  providers: [ListPropinsiService, DecimalPipe]
})
export class ListPropinsiComponent implements OnInit {

    ngOnInit(): void {
    }

    // tslint:disable-next-line: member-ordering
    propinsis$: Observable<ListPropinsi[]>;
    // tslint:disable-next-line: member-ordering
    total$: Observable<number>;

    // tslint:disable-next-line: member-ordering
    @ViewChildren(PropinsiHeaderDirective) headers: QueryList<PropinsiHeaderDirective>;

    constructor(public service: ListPropinsiService) {
      this.propinsis$ = service.propinsis$;
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
