import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangepwdComponent } from './changepwd/changepwd.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
    {
        path: '',
        component: ListUserComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'changepwd',
        component: ChangepwdComponent
    },
    {
        path: ':id',
        component: EditUserComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {}
