import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { map } from 'rxjs/operators';
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

                        const tipeJenisKelamin = tipes.find(tipe => tipe.nama && tipe.nama.toUpperCase() === 'JENIS KELAMIN');
                        if (tipeJenisKelamin) {
                            this.storage.set(StorageConstants.SETTINGS_TIPEID_JENISKELAMIN, tipeJenisKelamin.id).subscribe(() => {});
                        }
                        const tipeAgama = tipes.find(tipe => tipe.nama && tipe.nama.toUpperCase() === 'AGAMA');
                        if (tipeAgama) {
                            this.storage.set(StorageConstants.SETTINGS_TIPEID_AGAMA, tipeAgama.id).subscribe(() => {});
                        }
                        const tipeKewarganegaraan = tipes.find(tipe => tipe.nama && tipe.nama.toUpperCase() === 'KEWARGANEGARAAN');
                        if (tipeKewarganegaraan) {
                            this.storage.set(StorageConstants.SETTINGS_TIPEID_KEWARGANEGARAAN, tipeKewarganegaraan.id).subscribe(() => {});
                        }
                        const tipeStatusWarga = tipes.find(tipe => tipe.nama && tipe.nama.toUpperCase() === 'STATUS WARGA');
                        if (tipeStatusWarga) {
                            this.storage.set(StorageConstants.SETTINGS_TIPEID_STATUSWARGA, tipeStatusWarga.id).subscribe(() => {});
                        }
                        const tipePendidikan = tipes.find(tipe => tipe.nama && tipe.nama.toUpperCase() === 'PENDIDIKAN');
                        if (tipePendidikan) {
                            this.storage.set(StorageConstants.SETTINGS_TIPEID_PENDIDIKAN, tipePendidikan.id).subscribe(() => {});
                        }
                        const tipePekerjaan = tipes.find(tipe => tipe.nama && tipe.nama.toUpperCase() === 'PEKERJAAN');
                        if (tipePekerjaan) {
                            this.storage.set(StorageConstants.SETTINGS_TIPEID_PEKERJAAN, tipePekerjaan.id).subscribe(() => {});
                        }
                        const tipeStatusPerkawinan = tipes.find(tipe => tipe.nama && tipe.nama.toUpperCase() === 'STATUS PERKAWINAN');
                        if (tipeStatusPerkawinan) {
                            this.storage.set(StorageConstants.SETTINGS_TIPEID_STATUSPERKAWINAN, tipeStatusPerkawinan.id)
                            .subscribe(() => {});
                        }
                        const tipeHubKeluarga = tipes.find(tipe => tipe.nama && tipe.nama.toUpperCase() === 'HUBUNGAN KELUARGA');
                        if (tipeHubKeluarga) {
                            this.storage.set(StorageConstants.SETTINGS_TIPEID_HUB_KELUARGA, tipeHubKeluarga.id)
                            .subscribe(() => {});
                        }
                        const tipeGolDarah = tipes.find(tipe => tipe.nama && tipe.nama.toUpperCase() === 'GOLONGAN DARAH');
                        if (tipeGolDarah) {
                            this.storage.set(StorageConstants.SETTINGS_TIPEID_GOL_DARAH, tipeGolDarah.id)
                            .subscribe(() => {});
                        }
                        const tipePernahCovid = tipes.find(tipe => tipe.nama && tipe.nama.toUpperCase() === 'PERNAH COVID');
                        if (tipePernahCovid) {
                            this.storage.set(StorageConstants.SETTINGS_TIPEID_PERNAH_COVID, tipePernahCovid.id)
                            .subscribe(() => {});
                        }
                        const userLevel = tipes.find(tipe => tipe.nama && tipe.nama.toUpperCase() === 'USER LEVEL');
                        if (userLevel) {
                            this.storage.set(StorageConstants.SETTINGS_TIPEID_USER_LEVEL, userLevel.id)
                            .subscribe(() => {});
                        }
                        const alasanPengurangan = tipes.find(tipe => tipe.nama && tipe.nama.toUpperCase() === 'ALASAN PENGURANGAN');
                        if (alasanPengurangan) {
                            this.storage.set(StorageConstants.SETTINGS_TIPEID_ALASAN_PENGURANGAN, alasanPengurangan.id)
                            .subscribe(() => {});
                        }
                        const alasanPenambahan = tipes.find(tipe => tipe.nama && tipe.nama.toUpperCase() === 'ALASAN PENAMBAHAN');
                        if (alasanPenambahan) {
                            this.storage.set(StorageConstants.SETTINGS_TIPEID_ALASAN_PENAMBAHAN, alasanPenambahan.id)
                            .subscribe(() => {});
                        }
                        const jenisVaksinCovid19 = tipes.find(tipe => tipe.nama && tipe.nama.toUpperCase() === 'JENIS VAKSIN COVID19');
                        if (jenisVaksinCovid19) {
                            this.storage.set(StorageConstants.SETTINGS_TIPEID_JENIS_VAKSIN_COVID19, jenisVaksinCovid19.id)
                            .subscribe(() => {});
                        }
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
