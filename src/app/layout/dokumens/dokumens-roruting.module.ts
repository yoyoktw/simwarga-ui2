import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DokumensComponent } from './dokumens.component';

const routes: Routes = [
    {
        path: '',
        component: DokumensComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DokumensRoutingModule {}
