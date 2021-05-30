import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageMap } from '@ngx-pwa/local-storage';
import { UserDto } from '../../../core/dto/user.dto';
import { StorageConstants } from '../../../shared/constants/storage.constants';
import { routerTransition } from '../../../router.animations';
import { UserUtils } from '../../../shared/utils/user.utils';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [routerTransition()],
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;
  public profile: UserDto;
  public isSuperUser: Boolean = false;

  constructor(private storage: StorageMap) {
    this.profileForm = new FormGroup({
        profileId: new FormControl(),
        username: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required]),
        userLevel: new FormControl(null, [Validators.required]),
        propinsi: new FormControl(null, [Validators.required]),
        kabkota: new FormControl(null, [Validators.required]),
        kecamatan: new FormControl(null, [Validators.required]),
        desa: new FormControl(null, [Validators.required]),
        rw: new FormControl(null, [Validators.required]),
        rt: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.storage.get(StorageConstants.CURRENT_USER).subscribe((currentUser: UserDto) => {
        if (currentUser) {
            this.profile = currentUser;

            if (UserUtils.isSuperUser(this.profile.userLevel)) {
                this.isSuperUser = true;
            }

            this.profileForm.patchValue({
                profileId: this.profile.id,
                username: this.profile.username,
                email: this.profile.email,
                userLevel: this.profile.userLevel,
                propinsi: this.isSuperUser ? this.profile.propinsi : this.profile.namaPropinsi,
                kabkota: this.isSuperUser ? this.profile.kabkota : this.profile.deskripsiKabKota,
                kecamatan: this.isSuperUser ? this.profile.kecamatan : this.profile.namaKecamatan,
                desa: this.isSuperUser ? this.profile.desa : this.profile.namaDesa,
                rw: this.isSuperUser ? this.profile.rw : this.profile.namaRW,
                rt: this.isSuperUser ? this.profile.rt : this.profile.namaRT,
            });
        }
    });
  }

}
