import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from '../../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { KabkotaRoutingModule } from './kabkota-routing.module';
import { KabkotaHeaderDirective } from './util/kabkota-sortable.directive';
import { ListKabkotaComponent } from './list-kabkota/list-kabkota.component';

@NgModule({
    imports: [
        CommonModule, KabkotaRoutingModule,
        PageHeaderModule, FormsModule,
        ReactiveFormsModule,
        NgbModule
    ],
    declarations: [ListKabkotaComponent, KabkotaHeaderDirective],
    exports: [ListKabkotaComponent]
})
export class KabkotaModule { }
