import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { map } from 'rxjs/operators';
import { StorageConstants } from '../../shared/constants/storage.constants';
import { environment } from '../../../environments/environment';
import { WargaDto } from '../dto/warga.dto';

@Injectable({ providedIn: 'root' })
export class WargaService {
    constructor(private http: HttpClient,
        private storage: StorageMap) {}

    public getDaftarWarga() {
        return this.http
            .get<any>(`${environment.apiServiceUrl}warga`)
            .pipe(
                map((daftarWarga: WargaDto[]) => {
                    if (daftarWarga) {
                        this.storage.set(StorageConstants.SETTINGS_WARGA, daftarWarga).subscribe(() => {});
                    }
                    return daftarWarga;
                })
            );
    }
}
