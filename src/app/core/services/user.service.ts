import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { map } from 'rxjs/operators';
import { StorageConstants } from '../../shared/constants/storage.constants';
import { environment } from '../../../environments/environment';
import { UserDto } from '../dto/user.dto';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient,
        private storage: StorageMap) {}

    public getUsers() {
        return this.http
            .get<any>(`${environment.apiServiceUrl}users`)
            .pipe(
                map((users: UserDto[]) => {
                    if (users) {
                        this.storage.set(StorageConstants.SETTINGS_USERS, users).subscribe(() => {});
                    }
                    return users;
                })
            );
    }

    public save(userData: UserDto) {
        if (userData) {
            if (userData.id) {
                // Update
                return this.http
                    .put<any>(`${environment.apiServiceUrl}users`, userData)
                    .pipe(
                        map((user: UserDto) => {
                            return user;
                        })
                    );
            } else {
                // New
                return this.http
                    .post<any>(`${environment.apiServiceUrl}users`, userData)
                    .pipe(
                        map((user: UserDto) => {
                            return user;
                        })
                    );
            }
        }
    }

}
