import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
  animations: [routerTransition()],
  // providers: [ListDesaService, DecimalPipe]
})
export class ListUserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
