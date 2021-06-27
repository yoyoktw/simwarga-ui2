import { AfterViewChecked,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { WargaDto } from '../../../core/dto/warga.dto';
import { WargaService } from '../../../core/services/warga.service';
import { StorageConstants } from '../../../shared/constants/storage.constants';
import { routerTransition } from '../../../router.animations';
import { ListUtil } from '../../settings/utils/util/list-util';
import { first } from 'rxjs/operators';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { UserDto } from '../../../core/dto/user.dto';

@Component({
    selector: 'app-edit-warga',
    templateUrl: './edit-warga.component.html',
    styleUrls: ['./edit-warga.component.scss'],
    animations: [routerTransition()],
    encapsulation: ViewEncapsulation.None,
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditWargaComponent implements OnInit, AfterViewChecked {
    public wargaForm: FormGroup;
    public isAlertClosed: Boolean = true;
    public alertMessage: String = '';
    public alertType: String = 'success';

    private editHeader: String;
    public wargaList;

    public jenisKelaminList;
    public agamaList;
    public kewarganegaraanList;
    public statusWargaList;
    public pendidikanList;
    public pekerjaanList;
    public statusPerkawinanList;
    public hubKeluargaList;
    public golDarahList;
    public pernahCovidList;
    public profile: UserDto;

    constructor(private route: ActivatedRoute,
        private wargaService: WargaService,
        private storage: StorageMap,
        private readonly changeDetectorRef: ChangeDetectorRef) {
        this.wargaForm = new FormGroup({
            wargaId: new FormControl(),
            // idType: new FormControl(null, [Validators.required]),
            nik: new FormControl(null, [Validators.required]),
            nomorKK: new FormControl(null, [Validators.required]),
            nama: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [Validators.required]),
            rt: new FormControl(null),
            asalKTP: new FormControl(null),
            jenisKelamin: new FormControl(null, [Validators.required]),
            tempatLahir: new FormControl(null, [Validators.required]),
            tanggalLahir: new FormControl(null, [Validators.required]),
            agama: new FormControl(null, [Validators.required]),
            pendidikan: new FormControl(null, [Validators.required]),
            jenisPekerjaan: new FormControl(null, [Validators.required]),
            statusPerkawinan: new FormControl(null, [Validators.required]),
            hubunganKeluarga: new FormControl(null, [Validators.required]),
            kewarganegaraan: new FormControl(null, [Validators.required]),
            alamatTinggal: new FormControl(null, [Validators.required]),
            alamatKTP: new FormControl(null, [Validators.required]),
            statusWarga: new FormControl(null, [Validators.required]),
            keterangan: new FormControl(null),
            noHP: new FormControl(null),
            golDarah: new FormControl(null),
            pernahCovid: new FormControl(null),
            vaksinCovidKe1: new FormControl(null),
            vaksinCovidKe2: new FormControl(null),
            vaksinCovidKe3: new FormControl(null)
        });

        this.storage.get(StorageConstants.SETTINGS_WARGA).subscribe((listWarga: WargaDto[]) => {
            if (listWarga) {
                this.wargaList = listWarga;
            }
        });

        this.storage.get(StorageConstants.SETTINGS_UTILS_JENISKELAMIN).subscribe((jenisKelaminUtils: ListUtil[]) => {
            if (jenisKelaminUtils) {
                this.jenisKelaminList = jenisKelaminUtils;
            }
        });
        this.storage.get(StorageConstants.SETTINGS_UTILS_AGAMA).subscribe((agamaUtils: ListUtil[]) => {
            if (agamaUtils) {
                this.agamaList = agamaUtils;
            }
        });
        this.storage.get(StorageConstants.SETTINGS_UTILS_KEWARGANEGARAAN).subscribe((kewarganegaraanUtils: ListUtil[]) => {
            if (kewarganegaraanUtils) {
                this.kewarganegaraanList = kewarganegaraanUtils;
            }
        });
        this.storage.get(StorageConstants.SETTINGS_UTILS_STATUSWARGA).subscribe((statusWargaUtils: ListUtil[]) => {
            if (statusWargaUtils) {
                this.statusWargaList = statusWargaUtils;
            }
        });
        this.storage.get(StorageConstants.SETTINGS_UTILS_PENDIDIKAN).subscribe((pendidikanUtils: ListUtil[]) => {
            if (pendidikanUtils) {
                this.pendidikanList = pendidikanUtils;
            }
        });
        this.storage.get(StorageConstants.SETTINGS_UTILS_PEKERJAAN).subscribe((pekerjaanUtils: ListUtil[]) => {
            if (pekerjaanUtils) {
                this.pekerjaanList = pekerjaanUtils;
            }
        });
        this.storage.get(StorageConstants.SETTINGS_UTILS_STATUSPERKAWINAN).subscribe((statusPerkawinanUtils: ListUtil[]) => {
            if (statusPerkawinanUtils) {
                this.statusPerkawinanList = statusPerkawinanUtils;
            }
        });
        this.storage.get(StorageConstants.SETTINGS_UTILS_HUB_KELUARGA).subscribe((hubKeluargaUtils: ListUtil[]) => {
            if (hubKeluargaUtils) {
                this.hubKeluargaList = hubKeluargaUtils;
            }
        });
        this.storage.get(StorageConstants.SETTINGS_UTILS_GOL_DARAH).subscribe((golDarahUtils: ListUtil[]) => {
            if (golDarahUtils) {
                this.golDarahList = golDarahUtils;
            }
        });
        this.storage.get(StorageConstants.SETTINGS_UTILS_PERNAH_COVID).subscribe((pernahCovidUtils: ListUtil[]) => {
            if (pernahCovidUtils) {
                this.pernahCovidList = pernahCovidUtils;
            }
        });
    }

    ngAfterViewChecked(): void {
        this.changeDetectorRef.detectChanges();
    }

    ngOnInit() {
        const wargaId = this.route.snapshot.paramMap.get('id').toString();
        if (wargaId === '0') {
            this.wargaForm.patchValue({
                wargaId: 'New',
                // idType: '',
                nik: '',
                nomorKK: '',
                nama: '',
                email: '',
                rt: '',
                asalKTP: '',
                jenisKelamin: '',
                tempatLahir: '',
                tanggalLahir: '',
                agama: '',
                pendidikan: '',
                jenisPekerjaan: '',
                statusPerkawinan: '',
                hubunganKeluarga: '',
                kewarganegaraan: '',
                alamatTinggal: '',
                alamatKTP: '',
                statusWarga: '',
                keterangan: '',
                noHP: '',
                golDarah: '',
                pernahCovid: '',
                vaksinCovidKe1: '',
                vaksinCovidKe2: '',
                vaksinCovidKe3: '',
                });
            this.editHeader = 'Buat Warga Baru';
        } else {
            this.storage.get(StorageConstants.SETTINGS_WARGA).subscribe((listWarga: WargaDto[])  => {
                if (listWarga) {
                    listWarga.filter(warga => warga.id === wargaId).map(warga => {
                        this.wargaForm.patchValue({
                            wargaId: warga.id.toString(),
                            nik: warga.nik,
                            nomorKK: warga.nomorKK,
                            // idType: '' // this.getTipeById(util.tipe)
                            nama: warga.nama,
                            email: warga.email,
                            rt: warga.rt,
                            asalKTP: warga.asalKTP,
                            jenisKelamin: this.getJenisKelaminById(warga.jenisKelamin),
                            tempatLahir: warga.tempatLahir,
                            tanggalLahir: this.createDate(warga.tanggalLahir),
                            agama: this.getAgamaById(warga.agama),
                            pendidikan: this.getPendidikanById(warga.pendidikan),
                            jenisPekerjaan: this.getPekerjaanById(warga.jenisPekerjaan),
                            statusPerkawinan: this.getStatusPerkawinanById(warga.statusPerkawinan),
                            hubunganKeluarga: this.getHubKeluargaById(warga.hubunganKeluarga),
                            kewarganegaraan: this.getKewarganegaraanById(warga.kewarganegaraan),
                            alamatTinggal: warga.alamatTinggal,
                            alamatKTP: warga.alamatKTP,
                            statusWarga: this.getStatusWargaById(warga.statusWarga),
                            keterangan: warga.keterangan,
                            noHP: warga.noHP,
                            golDarah: this.getGolDarahById(warga.golDarah),
                            pernahCovid: this.getPernahCovidById(warga.pernahCovid),
                            vaksinCovidKe1: this.createDate(warga.vaksinCovidKe1),
                            vaksinCovidKe2: this.createDate(warga.vaksinCovidKe2),
                            vaksinCovidKe3: this.createDate(warga.vaksinCovidKe3),
                        });
                    });
                    this.editHeader = 'Edit Warga';
                }
            });
        }

        this.storage.get(StorageConstants.CURRENT_USER).subscribe((currentUser: UserDto) => {
            if (currentUser) {
                this.profile = currentUser;
            }
        });
    }

    public getHeaderTitle() {
        return this.editHeader;
    }

    private getJenisKelaminById(id: Number) {
        if (this.jenisKelaminList) {
            return this.jenisKelaminList.find(item => item.id === id);
        }
        return '';
    }

    private getAgamaById(id: Number) {
        if (this.agamaList) {
            return this.agamaList.find(item => item.id === id);
        }
        return '';
    }

    private getKewarganegaraanById(id: Number) {
        if (this.kewarganegaraanList) {
            return this.kewarganegaraanList.find(item => item.id === id);
        }
        return '';
    }

    private getStatusWargaById(id: Number) {
        if (this.statusWargaList) {
            return this.statusWargaList.find(item => item.id === id);
        }
        return '';
    }

    private getPendidikanById(id: Number) {
        if (this.pendidikanList) {
            return this.pendidikanList.find(item => item.id === id);
        }
        return '';
    }

    private getPekerjaanById(id: Number) {
        if (this.pekerjaanList) {
            return this.pekerjaanList.find(item => item.id === id);
        }
        return '';
    }

    private getStatusPerkawinanById(id: Number) {
        if (this.statusPerkawinanList) {
            return this.statusPerkawinanList.find(item => item.id === id);
        }
        return '';
    }

    private getHubKeluargaById(id: Number) {
        if (this.hubKeluargaList) {
            return this.hubKeluargaList.find(item => item.id === id);
        }
        return '';
    }

    private getGolDarahById(id: Number) {
        if (this.golDarahList) {
            return this.golDarahList.find(item => item.id === id);
        }
        return '';
    }

    private getPernahCovidById(id: Number) {
        if (this.pernahCovidList) {
            return this.pernahCovidList.find(item => item.id === id);
        }
        return '';
    }

    onFormSubmit() {
        this.wargaForm.get('vaksinCovidKe1').setErrors(null);
        this.wargaForm.get('vaksinCovidKe2').setErrors(null);
        this.wargaForm.get('vaksinCovidKe3').setErrors(null);
        if (this.wargaForm.invalid) {
            return;
        }

        const wargaData = this.createWargaData();

        this.wargaService
        .save(wargaData)
        .pipe(first())
        .subscribe(
            (response) => {
                this.wargaService.getDaftarWarga().subscribe();
                this.isAlertClosed = false;
                this.alertMessage = 'Warga saved successfully';
                this.alertType = 'success';
            },
            (error) => {
                console.log('error saved warga');
                this.isAlertClosed = false;
                this.alertMessage = 'Error saved warga';
                this.alertType = 'danger';
            }
        );
    }

    private createWargaData() {
        const wargaData: WargaDto = {
            nik: this.wargaForm.get('nik').value,
            nomorKK: this.wargaForm.get('nomorKK').value,
            nama: this.wargaForm.get('nama').value,
            email: this.wargaForm.get('email').value,
            rt: this.wargaForm.get('rt').value,
            asalKTP: this.wargaForm.get('asalKTP').value,
            jenisKelamin: (this.wargaForm.get('jenisKelamin').value).id,
            tempatLahir: this.wargaForm.get('tempatLahir').value,
            tanggalLahir: this.getDate(this.wargaForm.get('tanggalLahir').value),
            agama: (this.wargaForm.get('agama').value).id,
            pendidikan: (this.wargaForm.get('pendidikan').value).id,
            jenisPekerjaan: (this.wargaForm.get('jenisPekerjaan').value).id,
            statusPerkawinan: (this.wargaForm.get('statusPerkawinan').value).id,
            hubunganKeluarga: (this.wargaForm.get('hubunganKeluarga').value).id,
            kewarganegaraan: (this.wargaForm.get('kewarganegaraan').value).id,
            alamatTinggal: this.wargaForm.get('alamatTinggal').value,
            alamatKTP: this.wargaForm.get('alamatKTP').value,
            statusWarga: (this.wargaForm.get('statusWarga').value).id,
            keterangan: this.wargaForm.get('keterangan').value,
        };

        if (wargaData && this.wargaForm.get('wargaId').value !== 'New') {
            wargaData.id = this.wargaForm.get('wargaId').value;
        }

        if (this.wargaForm.get('noHP').value && this.wargaForm.get('noHP').value !== '') {
            wargaData.noHP = this.wargaForm.get('noHP').value;
        }
        if (this.wargaForm.get('golDarah').value && this.wargaForm.get('golDarah').value !== '') {
            wargaData.golDarah = (this.wargaForm.get('golDarah').value).id;
        }
        if (this.wargaForm.get('pernahCovid').value && this.wargaForm.get('pernahCovid').value !== '') {
            wargaData.pernahCovid = (this.wargaForm.get('pernahCovid').value).id;
        }
        if (this.wargaForm.get('vaksinCovidKe1').value && this.wargaForm.get('vaksinCovidKe1').value !== '') {
            wargaData.vaksinCovidKe1 = this.getDate(this.wargaForm.get('vaksinCovidKe1').value);
        } else {
            wargaData.vaksinCovidKe1 = null;
        }
        if (this.wargaForm.get('vaksinCovidKe2').value && this.wargaForm.get('vaksinCovidKe2').value !== '') {
            wargaData.vaksinCovidKe2 = this.getDate(this.wargaForm.get('vaksinCovidKe2').value);
        } else {
            wargaData.vaksinCovidKe2 = null;
        }
        if (this.wargaForm.get('vaksinCovidKe3').value && this.wargaForm.get('vaksinCovidKe3').value !== '') {
            wargaData.vaksinCovidKe3 = this.getDate(this.wargaForm.get('vaksinCovidKe3').value);
        } else {
            wargaData.vaksinCovidKe3 = null;
        }

        if (this.profile) {
            wargaData.rt = this.profile.rt;
            wargaData.rw = this.profile.rw;
        }

        return wargaData;
    }

    public getValidClass(formItem: string) {
        return this.wargaForm.invalid && this.wargaForm.get(formItem).invalid ? 'form-control is-invalid' : 'form-control';
    }

    private getDate(tgl: any) {
        if (tgl && tgl !== '') {
            return tgl.year + '-' + tgl.month + '-' + tgl.day;
        }
        return '';
    }

    private createDate(tgl: string) {
        if (tgl && tgl !== '') {
            const theDate = new Date(tgl);
            const theYear = theDate.getFullYear();
            const theMonth = theDate.getMonth() + 1;
            const theDay = theDate.getDate();
            const ngDate: NgbDateStruct = { year: theYear, month: theMonth, day: theDay };
            return ngDate;
        }
        return null;
    }
}
