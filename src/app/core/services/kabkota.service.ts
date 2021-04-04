import { HttpClient } from '@angular/common/http';
import { StorageMap } from '@ngx-pwa/local-storage';
import { map } from 'rxjs/operators';
import { StorageConstants } from '../../shared/constants/storage.constants';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { KabkotaDto } from '../dto/kabkota.dto';

@Injectable({ providedIn: 'root' })
export class KabkotaService {
    constructor(private http: HttpClient,
        private storage: StorageMap) {}

    public getListKabkota() {
        return this.http
            .get<any>(`${environment.apiServiceUrl}kabkota`)
            .pipe(
                map((listkabkota: KabkotaDto[]) => {
                    if (listkabkota) {
                        this.storage.set(StorageConstants.SETTINGS_KABKOTA, listkabkota).subscribe(() => {});
                    }
                    return listkabkota;
                })
            );
    }
}
