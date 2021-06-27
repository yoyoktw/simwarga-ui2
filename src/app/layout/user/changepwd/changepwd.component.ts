import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { ChangePasswordUserDto, UserDto } from '../../../core/dto/user.dto';
import { routerTransition } from '../../../router.animations';
import { StorageMap } from '@ngx-pwa/local-storage';
import { StorageConstants } from '../../../shared/constants/storage.constants';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.component.html',
  styleUrls: ['./changepwd.component.css'],
  animations: [routerTransition()],
  encapsulation: ViewEncapsulation.None
})
export class ChangepwdComponent implements OnInit {
    public userForm: FormGroup;
    public isAlertClosed = true;
    public profile: UserDto;
    public alertType: String = 'success';
    public alertMessage: String = '';

    constructor(private userService: UserService, private storage: StorageMap) {
        this.userForm = new FormGroup({
            username: new FormControl(null, [Validators.required]),
            userPassword: new FormControl(null, [Validators.required]),
        });
    }

    ngOnInit(): void {
        this.storage.get(StorageConstants.CURRENT_USER).subscribe((currentUser: UserDto) => {
            if (currentUser) {
                this.profile = currentUser;

                this.userForm.patchValue({
                    username: this.profile.username,
                    userPassword: ''
                });
            }
        });
    }

    public onChangePassword() {
        if (this.userForm.invalid) {
            return;
        }

        const userData: ChangePasswordUserDto = {
            username: this.userForm.get('username').value,
            password: this.userForm.get('userPassword').value
        };

        this.userService
        .changePassword(userData)
        .pipe(first())
        .subscribe(
            (response) => {
                this.userService.getUsers().subscribe();
                this.isAlertClosed = false;
                this.alertMessage = 'Password updated successfully';
                this.alertType = 'success';
            },
            (error) => {
                this.isAlertClosed = false;
                this.alertMessage = 'Error update password';
                this.alertType = 'danger';
            }
        );

    }

    public getValidClass(formItem: string) {
        return this.userForm.invalid && this.userForm.get(formItem).invalid ? 'form-control is-invalid' : 'form-control';
    }
}
