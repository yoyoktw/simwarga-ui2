import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUserComponent } from './list-user/list-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderModule } from '../../shared';
import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ChangepwdComponent } from './changepwd/changepwd.component';



@NgModule({
    imports: [
        CommonModule, UserRoutingModule,
        PageHeaderModule, FormsModule,
        ReactiveFormsModule,
        NgbModule
    ],
    declarations: [ListUserComponent, EditUserComponent, ProfileComponent, ChangepwdComponent],
})
export class UserModule { }
