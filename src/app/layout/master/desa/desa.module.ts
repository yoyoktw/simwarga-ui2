import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from '../../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListDesaRoutingModule } from './desa-routing.module';
import { ListDesaComponent } from './list-desa/list-desa.component';
import { DesaHeaderDirective } from './util/desa-sortable.directive';

@NgModule({
    imports: [
        CommonModule, ListDesaRoutingModule,
        PageHeaderModule, FormsModule,
        ReactiveFormsModule,
        NgbModule
    ],
    declarations: [ListDesaComponent, DesaHeaderDirective],
    exports: [ListDesaComponent]
})
export class DesaModule { }
