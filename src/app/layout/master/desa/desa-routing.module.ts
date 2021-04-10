import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDesaComponent } from './list-desa/list-desa.component';

const routes: Routes = [
    {
        path: '',
        component: ListDesaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListDesaRoutingModule {}
