import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../core/services/auth.service';
import { routerTransition } from '../router.animations';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {
        this.loginForm = new FormGroup({
            username: new FormControl(),
            password: new FormControl()
        });
    }

    onLoggedin() {
        if (this.loginForm.invalid) {
            console.log('invalid form');
            return;
        }

        const loginData = {
            username: this.loginForm.get('username').value,
            password: this.loginForm.get('password').value,
        };

        this.authService
        .login(loginData)
        .pipe(first())
        // tslint:disable-next-line: deprecation
        .subscribe(
            (response) => {
                if (response) {
                    console.log('login');
                    this.router.navigate(['/dashboard']);
                }
            },
            (error) => {
                console.log('login failed');
            }
        );
    }
}
