import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { StorageConstants } from '../../shared/constants/storage.constants';
import { environment } from '../../../environments/environment';
import { UtilDto } from '../dto/util.dto';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UtilsService {
    constructor(private http: HttpClient,
        private storage: StorageMap) {}

    public getUtils() {
        return this.http
            .get<any>(`${environment.apiServiceUrl}utils`)
            .pipe(
                map((utils: UtilDto[]) => {
                    if (utils) {
                        // tslint:disable-next-line: deprecation
                        this.storage.set(StorageConstants.SETTINGS_UTILS, utils).subscribe(() => {});

                        this.storage.get(StorageConstants.SETTINGS_TIPEID_JENISKELAMIN).subscribe(jenisKelaminId  => {
                            if (jenisKelaminId) {
                                const jenisKelaminList = utils.filter(util => util.tipe === jenisKelaminId);
                                if (jenisKelaminList) {
                                    this.storage.set(StorageConstants.SETTINGS_UTILS_JENISKELAMIN, jenisKelaminList)
                                    .subscribe(() => {});
                                }
                            }
                        });
                        this.storage.get(StorageConstants.SETTINGS_TIPEID_AGAMA).subscribe(agamaId  => {
                            if (agamaId) {
                                const agamaList = utils.filter(util => util.tipe === agamaId);
                                if (agamaList) {
                                    this.storage.set(StorageConstants.SETTINGS_UTILS_AGAMA, agamaList)
                                    .subscribe(() => {});
                                }
                            }
                        });
                        this.storage.get(StorageConstants.SETTINGS_TIPEID_KEWARGANEGARAAN).subscribe(kewarganegaraanId  => {
                            if (kewarganegaraanId) {
                                const kewarganegaraanList = utils.filter(util => util.tipe === kewarganegaraanId);
                                if (kewarganegaraanList) {
                                    this.storage.set(StorageConstants.SETTINGS_UTILS_KEWARGANEGARAAN, kewarganegaraanList)
                                    .subscribe(() => {});
                                }
                            }
                        });
                        this.storage.get(StorageConstants.SETTINGS_TIPEID_STATUSWARGA).subscribe(statusWargaId  => {
                            if (statusWargaId) {
                                const statusWargaList = utils.filter(util => util.tipe === statusWargaId);
                                if (statusWargaList) {
                                    this.storage.set(StorageConstants.SETTINGS_UTILS_STATUSWARGA, statusWargaList)
                                    .subscribe(() => {});
                                }
                            }
                        });
                        this.storage.get(StorageConstants.SETTINGS_TIPEID_PENDIDIKAN).subscribe(pendidikanId  => {
                            if (pendidikanId) {
                                const pendidikanList = utils.filter(util => util.tipe === pendidikanId);
                                if (pendidikanList) {
                                    this.storage.set(StorageConstants.SETTINGS_UTILS_PENDIDIKAN, pendidikanList)
                                    .subscribe(() => {});
                                }
                            }
                        });
                        this.storage.get(StorageConstants.SETTINGS_TIPEID_PEKERJAAN).subscribe(pekerjaanId  => {
                            if (pekerjaanId) {
                                const pekerjaanList = utils.filter(util => util.tipe === pekerjaanId);
                                if (pekerjaanList) {
                                    this.storage.set(StorageConstants.SETTINGS_UTILS_PEKERJAAN, pekerjaanList)
                                    .subscribe(() => {});
                                }
                            }
                        });
                        this.storage.get(StorageConstants.SETTINGS_TIPEID_STATUSPERKAWINAN).subscribe(statusPerkawinanId  => {
                            if (statusPerkawinanId) {
                                const statusPerkawinanList = utils.filter(util => util.tipe === statusPerkawinanId);
                                if (statusPerkawinanList) {
                                    this.storage.set(StorageConstants.SETTINGS_UTILS_STATUSPERKAWINAN, statusPerkawinanList)
                                    .subscribe(() => {});
                                }
                            }
                        });
                        this.storage.get(StorageConstants.SETTINGS_TIPEID_HUB_KELUARGA).subscribe(hubKeluargaId  => {
                            if (hubKeluargaId) {
                                const hubKeluargaList = utils.filter(util => util.tipe === hubKeluargaId);
                                if (hubKeluargaList) {
                                    this.storage.set(StorageConstants.SETTINGS_UTILS_HUB_KELUARGA, hubKeluargaList)
                                    .subscribe(() => {});
                                }
                            }
                        });
                        this.storage.get(StorageConstants.SETTINGS_TIPEID_GOL_DARAH).subscribe(golDarahId  => {
                            if (golDarahId) {
                                const golDarahList = utils.filter(util => util.tipe === golDarahId);
                                if (golDarahList) {
                                    this.storage.set(StorageConstants.SETTINGS_UTILS_GOL_DARAH, golDarahList)
                                    .subscribe(() => {});
                                }
                            }
                        });
                        this.storage.get(StorageConstants.SETTINGS_TIPEID_PERNAH_COVID).subscribe(pernahCovidId  => {
                            if (pernahCovidId) {
                                const pernahCovidList = utils.filter(util => util.tipe === pernahCovidId);
                                if (pernahCovidList) {
                                    this.storage.set(StorageConstants.SETTINGS_UTILS_PERNAH_COVID, pernahCovidList)
                                    .subscribe(() => {});
                                }
                            }
                        });
                        this.storage.get(StorageConstants.SETTINGS_TIPEID_USER_LEVEL).subscribe(userLevelId  => {
                            if (userLevelId) {
                                const userLevelList = utils.filter(util => util.tipe === userLevelId);
                                if (userLevelList) {
                                    this.storage.set(StorageConstants.SETTINGS_UTILS_USER_LEVEL, userLevelList)
                                    .subscribe(() => {});
                                }
                            }
                        });
                        this.storage.get(StorageConstants.SETTINGS_TIPEID_ALASAN_PENGURANGAN).subscribe(alasanPenguranganId  => {
                            if (alasanPenguranganId) {
                                const alasanPenguranganList = utils.filter(util => util.tipe === alasanPenguranganId);
                                if (alasanPenguranganList) {
                                    this.storage.set(StorageConstants.SETTINGS_UTILS_ALASAN_PENGURANGAN, alasanPenguranganList)
                                    .subscribe(() => {});
                                }
                            }
                        });
                        this.storage.get(StorageConstants.SETTINGS_TIPEID_ALASAN_PENAMBAHAN).subscribe(alasanPenambahanId  => {
                            if (alasanPenambahanId) {
                                const alasanPenambahanList = utils.filter(util => util.tipe === alasanPenambahanId);
                                if (alasanPenambahanList) {
                                    this.storage.set(StorageConstants.SETTINGS_UTILS_ALASAN_PENAMBAHAN, alasanPenambahanList)
                                    .subscribe(() => {});
                                }
                            }
                        });
                        this.storage.get(StorageConstants.SETTINGS_TIPEID_JENIS_VAKSIN_COVID19).subscribe(jenisVaksinCovid19Id  => {
                            if (jenisVaksinCovid19Id) {
                                const jenisVaksinCovid19IdList = utils.filter(util => util.tipe === jenisVaksinCovid19Id);
                                if (jenisVaksinCovid19IdList) {
                                    this.storage.set(StorageConstants.SETTINGS_UTILS_JENIS_VAKSIN_COVID19, jenisVaksinCovid19IdList)
                                    .subscribe(() => {});
                                }
                            }
                        });
                        this.storage.get(StorageConstants.SETTINGS_TIPEID_TIPE_DOKUMEN).subscribe(tipeDokumenId  => {
                            if (tipeDokumenId) {
                                const tipeDokumenIdList = utils.filter(util => util.tipe === tipeDokumenId);
                                if (tipeDokumenIdList) {
                                    this.storage.set(StorageConstants.SETTINGS_UTILS_TIPE_DOKUMEN, tipeDokumenIdList)
                                    .subscribe(() => {});
                                }
                            }
                        });
                    }
                    return utils;
                })
            );
    }

    public save(utilData: UtilDto) {
        if (utilData) {
            if (utilData.id === 0) {
                // New
                return this.http
                    .post<any>(`${environment.apiServiceUrl}utils`, utilData)
                    .pipe(
                        map((util: UtilDto) => {
                            return util;
                        })
                    );
            } else {
                // Update
                return this.http
                    .put<any>(`${environment.apiServiceUrl}utils`, utilData)
                    .pipe(
                        map((util: UtilDto) => {
                            return util;
                        })
                    );
            }
        }
    }

}
