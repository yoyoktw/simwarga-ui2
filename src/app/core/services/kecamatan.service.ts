import { HttpClient } from '@angular/common/http';
import { StorageMap } from '@ngx-pwa/local-storage';
import { map } from 'rxjs/operators';
import { StorageConstants } from '../../shared/constants/storage.constants';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { KecamatanDto } from '../dto/kecamatan.dto';

@Injectable({ providedIn: 'root' })
export class KecamatanService {
    constructor(private http: HttpClient,
        private storage: StorageMap) {}

    public getListKecamatan() {
        return this.http
            .get<any>(`${environment.apiServiceUrl}kecamatan`)
            .pipe(
                map((listkecamatan: KecamatanDto[]) => {
                    if (listkecamatan) {
                        this.storage.set(StorageConstants.SETTINGS_KECAMATAN, listkecamatan).subscribe(() => {});
                    }
                    return listkecamatan;
                })
            );
    }
}
