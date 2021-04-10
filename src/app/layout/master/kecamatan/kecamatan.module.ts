import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from '../../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListKecamatanRoutingModule } from './kecamatan-routing.module';
import { KecamatanHeaderDirective } from './util/kecamatan-sortable.directive';
import { ListKecamatanComponent } from './list-kecamatan/list-kecamatan.component';

@NgModule({
    imports: [
        CommonModule, ListKecamatanRoutingModule,
        PageHeaderModule, FormsModule,
        ReactiveFormsModule,
        NgbModule
    ],
    declarations: [ListKecamatanComponent, KecamatanHeaderDirective],
    exports: [ListKecamatanComponent]
})
export class KecamatanModule { }
