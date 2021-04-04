import { HttpClient } from '@angular/common/http';
import { StorageMap } from '@ngx-pwa/local-storage';
import { map } from 'rxjs/operators';
import { StorageConstants } from '../../shared/constants/storage.constants';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { RTDto } from '../dto/rt.dto';

@Injectable({ providedIn: 'root' })
export class RTService {
    constructor(private http: HttpClient,
        private storage: StorageMap) {}

    public getListRT() {
        return this.http
            .get<any>(`${environment.apiServiceUrl}rt`)
            .pipe(
                map((listRt: RTDto[]) => {
                    if (listRt) {
                        this.storage.set(StorageConstants.SETTINGS_RT, listRt).subscribe(() => {});
                    }
                    return listRt;
                })
            );
    }
}
