import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { map } from 'rxjs/operators';
import { StorageConstants } from '../../shared/constants/storage.constants';
import { environment } from '../../../environments/environment';
import { DokumenDto } from '../dto/dokumen.dto';
import { QueryParam } from './warga.service';

@Injectable({ providedIn: 'root' })
export class DokumenService {
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

    public saveDokumen(wargaId: string, tipeDokumen: string, dokumenFile: File) {
        const formData = new FormData();
        formData.append('file', dokumenFile, dokumenFile.name);

        const params: HttpParams = this.getNonEmptyHttpQueryParams({tipe: tipeDokumen, wargaId: wargaId});
        return this.http
            .post<any>(`${environment.apiServiceUrl}dokumen/upload`, formData, {params: params})
            .pipe(
                map((result: DokumenDto) => {
                    return result;
                })
            );

    }

    public getDokumen(rt: number) {
        const params: HttpParams = this.getNonEmptyHttpQueryParams({rt: rt.toString()});
        return this.http
            .get<any>(`${environment.apiServiceUrl}dokumen`, {params: params})
            .pipe(
                map((daftarDokumen: DokumenDto[]) => {
                    if (daftarDokumen) {
                        this.storage.set(StorageConstants.SETTINGS_DOKUMEN, daftarDokumen).subscribe(() => {});
                    }
                    return daftarDokumen;
                })
            );
    }

    public getDokumenByUrl(url: string) {
        return this.http
            .get(`${environment.apiServiceUrl}dokumen/${url}`, { responseType: 'blob' });
    }
}
