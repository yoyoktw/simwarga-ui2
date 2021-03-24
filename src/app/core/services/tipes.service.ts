import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { filter, map } from 'rxjs/operators';
import { StorageConstants } from '../../shared/constants/storage.constants';
import { environment } from '../../../environments/environment';
import { TipeDto } from '../dto/tipe.dto';

@Injectable({ providedIn: 'root' })
export class TipesService {
    constructor(private http: HttpClient,
        private storage: StorageMap) {}

    public getTipes() {
        return this.http
            .get<any>(`${environment.apiServiceUrl}tipes`)
            .pipe(
                map((tipes: TipeDto[]) => {
                    if (tipes) {
                        this.storage.set(StorageConstants.SETTINGS_TIPES, tipes).subscribe(() => {});
                    }
                    return tipes;
                })
            );
    }

    public save(tipeData: TipeDto) {
        if (tipeData) {
            if (tipeData.id === 0) {
                // New
                return this.http
                    .post<any>(`${environment.apiServiceUrl}tipes`, tipeData)
                    .pipe(
                        map((tipe: TipeDto) => {
                            return tipe;
                        })
                    );
            } else {
                // Update
                return this.http
                    .put<any>(`${environment.apiServiceUrl}tipes`, tipeData)
                    .pipe(
                        map((tipe: TipeDto) => {
                            return tipe;
                        })
                    );
            }
        }
    }

}
