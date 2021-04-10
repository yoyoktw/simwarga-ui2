import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListKecamatanComponent } from './list-kecamatan/list-kecamatan.component';

const routes: Routes = [
    {
        path: '',
        component: ListKecamatanComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListKecamatanRoutingModule {}
