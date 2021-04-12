import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRTComponent } from './list-rt/list-rt.component';

const routes: Routes = [
    {
        path: '',
        component: ListRTComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListRTRoutingModule {}
