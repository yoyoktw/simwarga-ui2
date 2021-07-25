import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { map } from 'rxjs/operators';
import { StorageConstants } from '../../shared/constants/storage.constants';
import { environment } from '../../../environments/environment';
import { WargaDto, WargaParam } from '../dto/warga.dto';

export interface QueryParam {
    [key: string]: string;
}
@Injectable({ providedIn: 'root' })
export class WargaService {
    constructor(private http: HttpClient,
        private storage: StorageMap) {}

    private getNonEmptyHttpQueryParams(paramsToBeAdded: QueryParam): HttpParams {
        let newParams = new HttpParams();
        Object.keys(paramsToBeAdded).forEach((key: string) => {
            if (paramsToBeAdded[key]) {
            newParams = newParams.set(key, paramsToBeAdded[key]);
            }
        });
        return newParams;
    }

    public getDaftarWarga(wargaParam: WargaParam) {
        let rtData = '';
        if (wargaParam.rt) {
            rtData = wargaParam.rt.toString();
        }
        const params: HttpParams = this.getNonEmptyHttpQueryParams({rt: rtData, rw: wargaParam.rw.toString()});
        return this.http
            .get<any>(`${environment.apiServiceUrl}warga`, {params: params})
            .pipe(
                map((daftarWarga: WargaDto[]) => {
                    if (daftarWarga) {
                        this.storage.set(StorageConstants.SETTINGS_WARGA, daftarWarga).subscribe(() => {});
                        const daftarWargaKK = daftarWarga.filter((warga: WargaDto) => warga.isKK && warga.isKK === true &&
                        warga.isAktif && warga.isAktif === true );
                        if (daftarWargaKK && daftarWargaKK.length > 0) {
                            this.storage.set(StorageConstants.SETTINGS_WARGA_KK, daftarWargaKK).subscribe(() => {});
                        }
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
