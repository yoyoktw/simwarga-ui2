import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditTipeComponent } from './edit-tipe/edit-tipe.component';
import { ListTipesComponent } from './list-tipes/list-tipes.component';

const routes: Routes = [
    {
        path: '',
        component: ListTipesComponent
    },
    {
        path: ':id',
        component: EditTipeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TipesRoutingModule {}
