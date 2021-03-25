import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../core/services/auth.service';
import { TipesService } from '../core/services/tipes.service';
import { UtilsService } from '../core/services/Utils.service';
import { WargaService } from '../core/services/warga.service';
import { routerTransition } from '../router.animations';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    constructor(private authService: AuthService,
        private tipesService: TipesService,
        private utilsService: UtilsService,
        private wargaService: WargaService,
        private router: Router) {
            this.loginForm = new FormGroup({
                username: new FormControl(),
                password: new FormControl()
            });
        }

    ngOnInit() {
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
                        this.tipesService.getTipes().subscribe();
                        this.utilsService.getUtils().subscribe();
                        this.authService.getCurrentUser().pipe(first()).subscribe(
                            (responseUser) => {
                                if (responseUser) {
                                    this.wargaService.getDaftarWarga().subscribe();
                                    this.router.navigate(['/dashboard']);
                                }
                            }
                        );
                        // this.router.navigate(['/warga']);
                    }
                },
                (error) => {
                    console.log('login failed');
                }
            );
    }
}
