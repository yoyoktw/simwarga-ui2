import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageConstants } from '../constants/storage.constants';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate() {
        const isLoggedin = localStorage.getItem(StorageConstants.IS_LOGGEDIN);
        const accessToken = localStorage.getItem(StorageConstants.AUTH_ACCESSTOKEN);
        if (isLoggedin && accessToken) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
