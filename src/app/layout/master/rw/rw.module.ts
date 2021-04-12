import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from '../../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListRWRoutingModule } from './rw-routing.module';
import { ListRWComponent } from './list-rw/list-rw.component';
import { RWHeaderDirective } from './util/rw-sortable.directive';

@NgModule({
    imports: [
        CommonModule, ListRWRoutingModule,
        PageHeaderModule, FormsModule,
        ReactiveFormsModule,
        NgbModule
    ],
    declarations: [ListRWComponent, RWHeaderDirective],
    exports: [ListRWComponent]
})
export class RWModule { }
