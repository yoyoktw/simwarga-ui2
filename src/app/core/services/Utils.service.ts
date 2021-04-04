import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { StorageConstants } from '../../shared/constants/storage.constants';
import { environment } from '../../../environments/environment';
import { UtilDto } from '../dto/util.dto';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UtilsService {
    constructor(private http: HttpClient,
        private storage: StorageMap) {}

    public getUtils() {
        return this.http
            .get<any>(`${environment.apiServiceUrl}utils`)
            .pipe(
                map((utils: UtilDto[]) => {
                    if (utils) {
                        // tslint:disable-next-line: deprecation
                        this.storage.set(StorageConstants.SETTINGS_UTILS, utils).subscribe(() => {});
                    }
                    return utils;
                })
            );
    }

    public save(utilData: UtilDto) {
        if (utilData) {
            if (utilData.id === 0) {
                // New
                return this.http
                    .post<any>(`${environment.apiServiceUrl}utils`, utilData)
                    .pipe(
                        map((util: UtilDto) => {
                            return util;
                        })
                    );
            } else {
                // Update
                return this.http
                    .put<any>(`${environment.apiServiceUrl}utils`, utilData)
                    .pipe(
                        map((util: UtilDto) => {
                            return util;
                        })
                    );
            }
        }
    }

}
