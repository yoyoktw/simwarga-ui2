import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderModule } from '../../../shared';
import { UtilsRoutingModule } from './utils-routing.module';
import { EditUtilComponent } from './edit-util/edit-util.component';
import { ListUtilsComponent } from './list-utils/list-utils.component';
import { UtilsHeaderDirective } from './util/utils-sortable.directive';

@NgModule({
  declarations: [ListUtilsComponent, EditUtilComponent, UtilsHeaderDirective],
  imports: [
    CommonModule, UtilsRoutingModule,
    PageHeaderModule, FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [ListUtilsComponent]
})
export class UtilsModule { }
