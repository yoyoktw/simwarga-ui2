import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListKabkotaComponent } from './list-kabkota/list-kabkota.component';

const routes: Routes = [
    {
        path: '',
        component: ListKabkotaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class KabkotaRoutingModule {}
