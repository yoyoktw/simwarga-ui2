import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [CommonModule, TranslateModule, LoginRoutingModule, ReactiveFormsModule],
    declarations: [LoginComponent],
    exports: [ReactiveFormsModule]
})
export class LoginModule {}
