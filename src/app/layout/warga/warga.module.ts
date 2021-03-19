import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from './../../shared';

import { WargaRoutingModule } from './warga-routing.module';
import { TablesWargaComponent } from './tables-warga/tables-warga.component';
import { EditWargaComponent } from './edit-warga/edit-warga.component';

@NgModule({
    imports: [CommonModule, WargaRoutingModule, PageHeaderModule],
    declarations: [TablesWargaComponent, EditWargaComponent]
})
export class WargaModule {}
