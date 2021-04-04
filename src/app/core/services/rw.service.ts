import { HttpClient } from '@angular/common/http';
import { StorageMap } from '@ngx-pwa/local-storage';
import { map } from 'rxjs/operators';
import { StorageConstants } from '../../shared/constants/storage.constants';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { RWDto } from '../dto/rw.dto';

@Injectable({ providedIn: 'root' })
export class RWService {
    constructor(private http: HttpClient,
        private storage: StorageMap) {}

    public getListRW() {
        return this.http
            .get<any>(`${environment.apiServiceUrl}rw`)
            .pipe(
                map((listRw: RWDto[]) => {
                    if (listRw) {
                        this.storage.set(StorageConstants.SETTINGS_RW, listRw).subscribe(() => {});
                    }
                    return listRw;
                })
            );
    }
}
