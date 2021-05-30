import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { routerTransition } from '../../../../router.animations';
import { ListUtilsService } from '../service/list-utils.service';
import { ListUtil } from '../util/list-util';
import { SortEvent, UtilsHeaderDirective } from '../util/utils-sortable.directive';

@Component({
  selector: 'app-list-utils',
  templateUrl: './list-utils.component.html',
  styleUrls: ['./list-utils.component.css'],
  animations: [routerTransition()],
  providers: [ListUtilsService, DecimalPipe]
})
export class ListUtilsComponent implements OnInit {

  ngOnInit(): void {
  }

  // tslint:disable-next-line: member-ordering
  utils$: Observable<ListUtil[]>;
  // tslint:disable-next-line: member-ordering
  total$: Observable<number>;

  // tslint:disable-next-line: member-ordering
  @ViewChildren(UtilsHeaderDirective) headers: QueryList<UtilsHeaderDirective>;

  constructor(public service: ListUtilsService, private router: Router) {
    this.utils$ = service.utils$;
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
    this.router.navigate(['/utils', id]);
  }

}
