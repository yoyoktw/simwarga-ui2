import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { WargaParam } from '../core/dto/warga.dto';
import { AuthService } from '../core/services/auth.service';
import { DesaService } from '../core/services/desa.service';
import { DokumenService } from '../core/services/dokumen.service';
import { KabkotaService } from '../core/services/kabkota.service';
import { KecamatanService } from '../core/services/kecamatan.service';
import { PropinsiService } from '../core/services/propinsi.service';
import { RTService } from '../core/services/rt.service';
import { RWService } from '../core/services/rw.service';
import { TipesService } from '../core/services/tipes.service';
import { UserService } from '../core/services/user.service';
import { UtilsService } from '../core/services/Utils.service';
import { WargaService } from '../core/services/warga.service';
import { routerTransition } from '../router.animations';
import { UserUtils } from '../shared/utils/user.utils';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    public isAlertClosed: Boolean = true;
    public alertMessage: String = '';

    constructor(private authService: AuthService,
        private tipesService: TipesService,
        private utilsService: UtilsService,
        private wargaService: WargaService,
        private propinsiService: PropinsiService,
        private kabkotaService: KabkotaService,
        private kecamatanService: KecamatanService,
        private desaService: DesaService,
        private rwService: RWService,
        private rtService: RTService,
        private userService: UserService,
        private dokumenService: DokumenService,
        private router: Router) {
            this.loginForm = new FormGroup({
                username: new FormControl(),
                password: new FormControl()
            });
        }

    ngOnInit() {
    }

    onLoggedin() {
        if (this.loginForm.invalid) {
            console.log('invalid form');
            return;
        }

        const loginData = {
            username: this.loginForm.get('username').value,
            password: this.loginForm.get('password').value,
        };

        this.authService
            .login(loginData)
            .pipe(first())
            // tslint:disable-next-line: deprecation
            .subscribe(
                (response) => {
                    if (response) {
                        console.log('login');
                        this.tipesService.getTipes().subscribe();
                        this.utilsService.getUtils().subscribe();
                        this.authService.getCurrentUser().pipe(first()).subscribe(
                            (responseUser) => {
                                if (responseUser) {
                                    if (!UserUtils.isSuperUser(responseUser.userLevel)) {
                                        const wargaParam: WargaParam = {
                                            rt: responseUser.rt,
                                            rw: responseUser.rw
                                        };
                                        this.wargaService.getDaftarWarga(wargaParam).subscribe();
                                        this.dokumenService.getDokumen(responseUser.rt).subscribe();
                                    }
                                    this.propinsiService.getListPropinsi().subscribe();
                                    this.kabkotaService.getListKabkota().subscribe();
                                    this.kecamatanService.getListKecamatan().subscribe();
                                    this.desaService.getListDesa().subscribe();
                                    this.rwService.getListRW().subscribe();
                                    this.rtService.getListRT().subscribe();

                                    if (this.isAllowed(responseUser.userLevel)) {
                                        this.userService.getUsers().subscribe();
                                    }

                                    this.router.navigate(['/dashboard']);
                                }
                            }
                        );
                    }
                },
                (error) => {
                    this.isAlertClosed = false;
                    if (error && error.error && error.error.message) {
                        this.alertMessage = 'Login gagal : ' + error.error.message;
                    }
                }
            );
    }

    private isAllowed(userLevel: string) {
        let result = false;
        result = UserUtils.isSuperUser(userLevel) || UserUtils.isAdminRT(userLevel);
        return result;
    }

}
