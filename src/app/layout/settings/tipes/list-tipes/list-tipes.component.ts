import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { routerTransition } from '../../../../router.animations';
import { ListTipesService } from '../service/list-tipes.service';
import { ListTipe } from '../util/list-tipe';
import { SortEvent, TipesHeaderDirective } from '../util/tipes-sortable.directive';

@Component({
  selector: 'app-list-tipes',
  templateUrl: './list-tipes.component.html',
  styleUrls: ['./list-tipes.component.css'],
  animations: [routerTransition()],
  providers: [ListTipesService, DecimalPipe]
})
export class ListTipesComponent implements OnInit {

  ngOnInit(): void {
  }

  // tslint:disable-next-line: member-ordering
  tipes$: Observable<ListTipe[]>;
  // tslint:disable-next-line: member-ordering
  total$: Observable<number>;

  // tslint:disable-next-line: member-ordering
  @ViewChildren(TipesHeaderDirective) headers: QueryList<TipesHeaderDirective>;

  constructor(public service: ListTipesService) {
    this.tipes$ = service.tipes$;
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
