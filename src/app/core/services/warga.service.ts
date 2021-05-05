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

    public save(wargaData: WargaDto) {
        if (wargaData) {
            if (wargaData.id) {
                // Update
                return this.http
                    .put<any>(`${environment.apiServiceUrl}warga`, wargaData)
                    .pipe(
                        map((warga: WargaDto) => {
                            return warga;
                        })
                    );
            } else {
                // New
                return this.http
                    .post<any>(`${environment.apiServiceUrl}warga`, wargaData)
                    .pipe(
                        map((warga: WargaDto) => {
                            return warga;
                        })
                    );
            }
        }
    }

}
