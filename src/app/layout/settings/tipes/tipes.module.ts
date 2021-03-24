import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTipesComponent } from './list-tipes/list-tipes.component';
import { EditTipeComponent } from './edit-tipe/edit-tipe.component';
import { TipesRoutingModule } from './tipes-routing.module';
import { PageHeaderModule } from '../../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TipesHeaderDirective } from './util/tipes-sortable.directive';

@NgModule({
  imports: [
    CommonModule, TipesRoutingModule,
    PageHeaderModule, FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [ListTipesComponent, EditTipeComponent, TipesHeaderDirective],
  exports: [ListTipesComponent]
})
export class TipesModule { }
