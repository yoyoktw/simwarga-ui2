import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DokumensComponent } from './dokumens.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderModule } from './../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DokumensRoutingModule } from './dokumens-roruting.module';



@NgModule({
  declarations: [DokumensComponent],
  imports: [
    CommonModule, DokumensRoutingModule,
    PageHeaderModule, FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class DokumensModule { }
