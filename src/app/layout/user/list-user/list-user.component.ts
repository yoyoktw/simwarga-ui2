import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { routerTransition } from '../../../router.animations';
import { ListUsersService } from '../service/list-user.service';
import { ListUsers } from '../util/list-user';
import { SortEvent, UsersHeaderDirective } from '../util/user-sortable.directive';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
  animations: [routerTransition()],
  providers: [ListUsersService, DecimalPipe]
})
export class ListUserComponent implements OnInit {

    ngOnInit(): void {
    }

    // tslint:disable-next-line: member-ordering
    users$: Observable<ListUsers[]>;
    // tslint:disable-next-line: member-ordering
    total$: Observable<number>;

    // tslint:disable-next-line: member-ordering
    @ViewChildren(UsersHeaderDirective) headers: QueryList<UsersHeaderDirective>;

    constructor(public service: ListUsersService, private router: Router) {
        this.users$ = service.users$;
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

    public onClick(id: string) {
        this.router.navigate(['/user', id]);
    }
}
