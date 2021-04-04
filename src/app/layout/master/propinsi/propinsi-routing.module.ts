import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPropinsiComponent } from './list-propinsi/list-propinsi.component';

const routes: Routes = [
    {
        path: '',
        component: ListPropinsiComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PropinsiRoutingModule {}
