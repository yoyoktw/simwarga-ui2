import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditWargaComponent } from './edit-warga/edit-warga.component';
import { TablesWargaComponent } from './tables-warga/tables-warga.component';

const routes: Routes = [
    {
        path: '',
        component: TablesWargaComponent
    },
    {
        path: ':id',
        component: EditWargaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WargaRoutingModule {}
