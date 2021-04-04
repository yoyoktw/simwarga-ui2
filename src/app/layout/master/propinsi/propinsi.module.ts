import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from '../../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListPropinsiComponent } from './list-propinsi/list-propinsi.component';
import { PropinsiHeaderDirective } from './util/propinsi-sortable.directive';
import { PropinsiRoutingModule } from './propinsi-routing.module';

@NgModule({
    imports: [
        CommonModule, PropinsiRoutingModule,
        PageHeaderModule, FormsModule,
        ReactiveFormsModule,
        NgbModule
    ],
    declarations: [ListPropinsiComponent, PropinsiHeaderDirective],
    exports: [ListPropinsiComponent]
})
export class PropinsiModule { }
