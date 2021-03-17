import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { LoginStatusDto } from '../dto/login-status.dto';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient,
        private router: Router) {}

    public login(loginData) {
        return this.http
            .post<any>(`${environment.apiServiceUrl}auth/login`, loginData)
            .pipe(
                map((loginStatus: LoginStatusDto) => {
                    if (loginStatus) {
                        localStorage.setItem('auth-username', loginStatus.username );
                        localStorage.setItem('auth-accessToken', loginStatus.accessToken );
                        localStorage.setItem('auth-expiresIn', loginStatus.expiresIn );
                        localStorage.setItem('isLoggedin', 'true');
                    }
                    return loginStatus;
                })
            );
    }

    public logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('auth-username');
        localStorage.removeItem('auth-accessToken');
        localStorage.removeItem('auth-expiresIn');
        localStorage.removeItem('isLoggedin');

        this.router.navigate(['/login']);
      }
}
