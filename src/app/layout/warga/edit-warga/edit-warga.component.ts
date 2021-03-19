import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';

@Component({
    selector: 'app-edit-warga',
    templateUrl: './edit-warga.component.html',
    styleUrls: ['./edit-warga.component.scss'],
    animations: [routerTransition()]
})
export class EditWargaComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
