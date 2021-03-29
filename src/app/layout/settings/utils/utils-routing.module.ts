import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUtilComponent } from './edit-util/edit-util.component';
import { ListUtilsComponent } from './list-utils/list-utils.component';

const routes: Routes = [
    {
        path: '',
        component: ListUtilsComponent
    },
    {
        path: ':id',
        component: EditUtilComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UtilsRoutingModule {}
