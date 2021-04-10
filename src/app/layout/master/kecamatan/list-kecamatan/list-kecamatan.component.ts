import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { routerTransition } from '../../../../router.animations';
import { ListKecamatanService } from '../service/list-kecamatan.service';
import { KecamatanHeaderDirective, SortEvent } from '../util/kecamatan-sortable.directive';
import { ListKecamatan } from '../util/list-kecamatan';

@Component({
  selector: 'app-kecamatan-propinsi',
  templateUrl: './list-kecamatan.component.html',
  styleUrls: ['./list-kecamatan.component.css'],
  animations: [routerTransition()],
  providers: [ListKecamatanService, DecimalPipe]
})
export class ListKecamatanComponent implements OnInit {

    ngOnInit(): void {
    }

    // tslint:disable-next-line: member-ordering
    itemList$: Observable<ListKecamatan[]>;
    // tslint:disable-next-line: member-ordering
    total$: Observable<number>;

    // tslint:disable-next-line: member-ordering
    @ViewChildren(KecamatanHeaderDirective) headers: QueryList<KecamatanHeaderDirective>;

    constructor(public service: ListKecamatanService) {
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
