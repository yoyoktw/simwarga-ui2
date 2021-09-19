import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { StorageConstants } from '../../../shared/constants/storage.constants';
import { UserService } from '../../../core/services/user.service';
import { routerTransition } from '../../../router.animations';
import { ActivateUserDto, UserDto } from '../../../core/dto/user.dto';
import { ListUtil } from '../../settings/utils/util/list-util';
import { PropinsiDto } from '../../../core/dto/propinsi.dto';
import { KabkotaDto } from '../../../core/dto/kabkota.dto';
import { KecamatanDto } from '../../../core/dto/kecamatan.dto';
import { DesaDto } from '../../../core/dto/desa.dto';
import { RWDto } from '../../../core/dto/rw.dto';
import { RTDto } from '../../../core/dto/rt.dto';
import { first } from 'rxjs/operators';
import { WargaDto } from '../../../core/dto/warga.dto';
import { UserUtils } from '../../../shared/utils/user.utils';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  animations: [routerTransition()],
  encapsulation: ViewEncapsulation.None
})
export class EditUserComponent implements OnInit {
    private editHeader: String;
    public userForm: FormGroup;
    public isAlertClosed = true;
    public userLevelList;
    public propinsiList;
    public kabKotaList;
    public kecamatanList;
    public desaList;
    public rwList;
    public rtList;
    public alertMessage: String = '';
    public alertType: String = 'success';
    public isHidePassword = false;
    public isHideActive = true;
    public wargaKKList;
    public isWargaVisible = false;
    public isRTVisible = false;

    constructor(private route: ActivatedRoute, private userService: UserService, private storage: StorageMap) {
        this.userForm = new FormGroup({
            userId: new FormControl(),
            username: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [Validators.required]),
            userLevel: new FormControl(null, [Validators.required]),
            propinsi: new FormControl(null, [Validators.required]),
            kabkota: new FormControl(null, [Validators.required]),
            kecamatan: new FormControl(null, [Validators.required]),
            desa: new FormControl(null, [Validators.required]),
            rw: new FormControl(null, [Validators.required]),
            rt: new FormControl(null),
            warga: new FormControl(null),
            userPassword: new FormControl(null),
        });

        this.storage.get(StorageConstants.SETTINGS_UTILS_USER_LEVEL).subscribe((userLevels: ListUtil[]) => {
            if (userLevels) {
                this.userLevelList = userLevels;
            }
        });
        this.storage.get(StorageConstants.SETTINGS_PROPINSI).subscribe((propinsis: PropinsiDto[]) => {
            if (propinsis) {
                this.propinsiList = propinsis;
            }
        });
        this.storage.get(StorageConstants.SETTINGS_KABKOTA).subscribe((kabkotas: KabkotaDto[]) => {
            if (kabkotas) {
                this.kabKotaList = kabkotas;
            }
        });
        this.storage.get(StorageConstants.SETTINGS_KECAMATAN).subscribe((kecamatans: KecamatanDto[]) => {
            if (kecamatans) {
                this.kecamatanList = kecamatans;
            }
        });
        this.storage.get(StorageConstants.SETTINGS_DESA).subscribe((desas: DesaDto[]) => {
            if (desas) {
                this.desaList = desas;
            }
        });
        this.storage.get(StorageConstants.SETTINGS_RW).subscribe((rws: RWDto[]) => {
            if (rws) {
                this.rwList = rws;
            }
        });
        this.storage.get(StorageConstants.SETTINGS_RT).subscribe((rts: RTDto[]) => {
            if (rts) {
                this.rtList = rts;
            }
        });
        this.storage.get(StorageConstants.SETTINGS_WARGA_KK).subscribe((listWargaKK: WargaDto[]) => {
            if (listWargaKK) {
                this.wargaKKList = listWargaKK;
            }
        });

    }

    ngOnInit(): void {
        const userId = this.route.snapshot.paramMap.get('id');
        if (userId === '0') {
            this.userForm.patchValue({
                userId: 'New',
                username: '',
                email: '',
                userLevel: '',
                propinsi: '',
                kabkota: '',
                kecamatan: '',
                desa: '',
                rw: '',
                rt: '',
                userPassword: '',
                warga: ''
            });
            this.editHeader = 'Buat User Baru';
            this.isHideActive = false;
        } else {
            this.storage.get(StorageConstants.SETTINGS_USERS).subscribe((userList: UserDto[])  => {
                if (userList) {
                    userList.filter(user => user.id === userId).map(user => {
                        this.userForm.patchValue({
                            userId: user.id,
                            username: user.username,
                            email: user.email,
                            userLevel: this.getUserLevelById(user.userLevel),
                            propinsi: this.getPropinsiById(user.propinsi),
                            kabkota: this.getKabKotaById(user.kabkota),
                            kecamatan: this.getKecamatanById(user.kecamatan),
                            desa: this.getDesaById(user.desa),
                            rw: this.getRWById(user.rw),
                            rt: this.getRTById(user.rt),
                            userPassword: ''
                        });
                        this.editHeader = 'Edit User';
                        this.isHidePassword = true;
                        this.isHideActive = true;
                        this.checkUserLevel(user.userLevel);
                    });
                }
            });
        }
    }

    onFormSubmit() {
        if (this.userForm.invalid) {
            return;
        }
        const userData = this.createUserData();

        this.userService
        .save(userData)
        .pipe(first())
        .subscribe(
            (response) => {
                this.userService.getUsers().subscribe();
                this.isAlertClosed = false;
                this.alertMessage = 'User saved successfully';
                this.alertType = 'success';
            },
            (error) => {
                console.log('error saved warga');
                this.isAlertClosed = false;
                this.alertMessage = 'Error saved user';
                this.alertType = 'danger';
            }
        );

    }

    private createUserData() {
        const userData: UserDto = {
            username: this.userForm.get('username').value,
            email: this.userForm.get('email').value,
            userLevel: (this.userForm.get('userLevel').value).deskripsi,
            propinsi: (this.userForm.get('propinsi').value).id,
            kabkota: (this.userForm.get('kabkota').value).id,
            kecamatan: (this.userForm.get('kecamatan').value).id,
            desa: (this.userForm.get('desa').value).id,
            rw: (this.userForm.get('rw').value).id,
            rt: (this.userForm.get('rt').value).id,
            password: this.userForm.get('userPassword').value,
        };

        if (userData && this.userForm.get('userId').value !== 'New') {
            userData.id = this.userForm.get('userId').value;
        }

        if (userData && userData.userLevel === 'Warga') {
            userData.nomorKK = (this.userForm.get('warga').value).nomorKK;
        }

        return userData;
    }

    public activateUser() {
        const userActivate: ActivateUserDto = {
            username: this.userForm.get('username').value
        };

        this.userService
        .activate(userActivate)
        .pipe(first())
        .subscribe(
            (response) => {
                this.userService.getUsers().subscribe();
                this.isAlertClosed = false;
                this.alertMessage = 'User activated successfully';
                this.alertType = 'success';
            },
            (error) => {
                this.isAlertClosed = false;
                this.alertMessage = 'Error activated user';
                this.alertType = 'danger';
            }
        );
    }

    public getValidClass(formItem: string) {
        return this.userForm.invalid && this.userForm.get(formItem).invalid ? 'form-control is-invalid' : 'form-control';
    }

    public getHeaderTitle() {
        return this.editHeader;
    }

    private getUserLevelById(userLevel: string) {
        if (this.userLevelList && userLevel) {
            return this.userLevelList.find(item => item.deskripsi === userLevel);
        }
        return '';
    }

    private getPropinsiById(id: Number) {
        if (this.propinsiList) {
            return this.propinsiList.find(item => item.id === id);
        }
        return '';
    }

    private getKabKotaById(id: Number) {
        if (this.kabKotaList) {
            return this.kabKotaList.find(item => item.id === id);
        }
        return '';
    }

    private getKecamatanById(id: Number) {
        if (this.kecamatanList) {
            return this.kecamatanList.find(item => item.id === id);
        }
        return '';
    }

    private getDesaById(id: Number) {
        if (this.desaList) {
            return this.desaList.find(item => item.id === id);
        }
        return '';
    }

    private getRWById(id: Number) {
        if (this.rwList) {
            return this.rwList.find(item => item.id === id);
        }
        return '';
    }

    private getRTById(id: Number) {
        if (this.rtList) {
            return this.rtList.find(item => item.id === id);
        }
        return '';
    }

    public getFamilyGroupLabel(wargaData: WargaDto) {
        return wargaData.nomorKK + ' - ' + wargaData.nama;
    }

    public userLevelChanged() {
        if (this.userForm.get('userLevel').value) {
            const selectedUserLevel = this.userForm.get('userLevel').value;
            this.checkUserLevel(selectedUserLevel.deskripsi);
        }
    }

    private checkUserLevel(userLevel: string) {
        if (UserUtils.isWarga(userLevel)) {
            this.isRTVisible = true;
            this.isWargaVisible = true;
        } else if (UserUtils.isAdminRT(userLevel) || UserUtils.isPengurusRT(userLevel)) {
            this.isRTVisible = true;
            this.isWargaVisible = false;
        } else {
            this.isRTVisible = false;
            this.isWargaVisible = false;
        }
    }
}
