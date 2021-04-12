import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from '../../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListRTRoutingModule } from './rt-routing.module';
import { ListRTComponent } from './list-rt/list-rt.component';
import { RTHeaderDirective } from './util/rt-sortable.directive';

@NgModule({
    imports: [
        CommonModule, ListRTRoutingModule,
        PageHeaderModule, FormsModule,
        ReactiveFormsModule,
        NgbModule
    ],
    declarations: [ListRTComponent, RTHeaderDirective],
    exports: [ListRTComponent]
})
export class RTModule { }
