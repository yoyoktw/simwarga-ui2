import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';

@Component({
    selector: 'app-tables-warga',
    templateUrl: './tables-warga.component.html',
    styleUrls: ['./tables-warga.component.scss'],
    animations: [routerTransition()]
})
export class TablesWargaComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
