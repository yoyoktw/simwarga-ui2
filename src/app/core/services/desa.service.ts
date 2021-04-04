import { HttpClient } from '@angular/common/http';
import { StorageMap } from '@ngx-pwa/local-storage';
import { map } from 'rxjs/operators';
import { StorageConstants } from '../../shared/constants/storage.constants';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { DesaDto } from '../dto/desa.dto';

@Injectable({ providedIn: 'root' })
export class DesaService {
    constructor(private http: HttpClient,
        private storage: StorageMap) {}

    public getListDesa() {
        return this.http
            .get<any>(`${environment.apiServiceUrl}desa`)
            .pipe(
                map((listDesa: DesaDto[]) => {
                    if (listDesa) {
                        this.storage.set(StorageConstants.SETTINGS_DESA, listDesa).subscribe(() => {});
                    }
                    return listDesa;
                })
            );
    }
}
