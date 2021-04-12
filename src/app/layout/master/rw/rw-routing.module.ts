import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRWComponent } from './list-rw/list-rw.component';

const routes: Routes = [
    {
        path: '',
        component: ListRWComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListRWRoutingModule {}
