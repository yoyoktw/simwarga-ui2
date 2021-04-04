import { HttpClient } from '@angular/common/http';
import { StorageMap } from '@ngx-pwa/local-storage';
import { map } from 'rxjs/operators';
import { StorageConstants } from '../../shared/constants/storage.constants';
import { environment } from '../../../environments/environment';
import { PropinsiDto } from '../dto/propinsi.dto';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PropinsiService {
    constructor(private http: HttpClient,
        private storage: StorageMap) {}

    public getListPropinsi() {
        return this.http
            .get<any>(`${environment.apiServiceUrl}propinsi`)
            .pipe(
                map((listPropinsi: PropinsiDto[]) => {
                    if (listPropinsi) {
                        this.storage.set(StorageConstants.SETTINGS_PROPINSI, listPropinsi).subscribe(() => {});
                    }
                    return listPropinsi;
                })
            );
    }
}
