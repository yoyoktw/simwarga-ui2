import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { LoginStatusDto } from '../dto/login-status.dto';
import { UserDto } from '../dto/user.dto';
import { StorageMap } from '@ngx-pwa/local-storage';
import { StorageConstants } from '../../shared/constants/storage.constants';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private loginStatus: LoginStatusDto;
    public currentUser: UserDto;

    constructor(private http: HttpClient,
                private router: Router,
                private storage: StorageMap) {}

    public login(loginData) {
        return this.http
            .post<any>(`${environment.apiServiceUrl}auth/login`, loginData)
            .pipe(
                map((loginStatus: LoginStatusDto) => {
                    if (loginStatus) {
                        this.loginStatus = loginStatus;
                        localStorage.setItem(StorageConstants.AUTH_USERNAME, loginStatus.username );
                        localStorage.setItem(StorageConstants.AUTH_ACCESSTOKEN, loginStatus.accessToken );
                        localStorage.setItem(StorageConstants.AUTH_EXPIRESIN, loginStatus.expiresIn );
                        localStorage.setItem(StorageConstants.IS_LOGGEDIN, 'true');
                    }
                    return loginStatus;
                })
            );
    }

    public getCurrentUser() {
        return this.http
            .get<any>(`${environment.apiServiceUrl}auth/whoami`)
            .pipe(
                map((currentUser: UserDto) => {
                    if (currentUser) {
                        this.currentUser = currentUser;
                        // tslint:disable-next-line: deprecation
                        this.storage.set(StorageConstants.CURRENT_USER, currentUser).subscribe(() => {});
                    }
                    return currentUser;
                })
            );
    }

    public getLoginStatus(): LoginStatusDto | undefined {
        if (this.loginStatus) {
            return this.loginStatus;
        } else {
            const username = localStorage.getItem(StorageConstants.AUTH_USERNAME) ?
                localStorage.getItem(StorageConstants.AUTH_USERNAME) : undefined;
            const accessToken = localStorage.getItem(StorageConstants.AUTH_ACCESSTOKEN) ?
                localStorage.getItem(StorageConstants.AUTH_ACCESSTOKEN) : undefined;
            const expire = localStorage.getItem(StorageConstants.AUTH_EXPIRESIN) ?
                localStorage.getItem(StorageConstants.AUTH_EXPIRESIN) : undefined;
            if (username && accessToken && expire) {
                const loginStatus: LoginStatusDto = {
                    username: username,
                    accessToken: accessToken,
                    expiresIn: expire
                };
                return loginStatus;
            } else {
                return undefined;
            }
        }
    }

    public logout() {
        localStorage.clear();
        // tslint:disable-next-line: deprecation
        this.storage.clear().subscribe(() => {});
        this.router.navigate(['/login']);
      }
}
