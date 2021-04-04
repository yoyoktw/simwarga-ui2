import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { UtilDto } from '../../../../core/dto/util.dto';
import { StorageConstants } from '../../../../shared/constants/storage.constants';
import { UtilsService } from '../../../../core/services/Utils.service';
import { routerTransition } from '../../../../router.animations';
import { ListTipe } from '../../tipes/util/list-tipe';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-util',
  templateUrl: './edit-util.component.html',
  styleUrls: ['./edit-util.component.css'],
  animations: [routerTransition()],
  encapsulation: ViewEncapsulation.None
})
export class EditUtilComponent implements OnInit {
    public utilForm: FormGroup;
    public isAlertClosed: Boolean = true;
    public alertMessage: String = '';
    public alertType: String = 'success';

    public tipeList;

    private isDeskripsiValid: Boolean = true;
    private isTipeValid: Boolean = true;

  constructor(private route: ActivatedRoute, private utilsService: UtilsService, private storage: StorageMap) {
    this.utilForm = new FormGroup({
        utilId: new FormControl(),
        deskripsiUtil: new FormControl(null, [Validators.required]),
        tipe: new FormControl(null, [Validators.required])
    });

    this.storage.get(StorageConstants.SETTINGS_TIPES).subscribe((tipes: ListTipe[]) => {
        if (tipes) {
            this.tipeList = tipes;
        }
    });

  }

  ngOnInit(): void {
    const utilId = +this.route.snapshot.paramMap.get('id');
    if (utilId === 0) {
        this.utilForm.patchValue({
            utilId: 'New',
            deskripsiUtil: '',
            tipe: ''
        });
    } else {
        this.storage.get(StorageConstants.SETTINGS_UTILS).subscribe((utilList: UtilDto[])  => {
            if (utilList) {
                utilList.filter(util => util.id === utilId).map(util => {
                    this.utilForm.patchValue({
                        utilId: util.id.toString(),
                        deskripsiUtil: util.deskripsi,
                        tipe: this.getTipeById(util.tipe)
                    });
                });
            }
        });
    }
  }

  private getTipeById(tipeId: Number) {
    return this.tipeList.find(item => item.id === tipeId);
  }

  onFormSubmit() {
    this.isDeskripsiValid = true;
    this.isTipeValid = true;
    if (this.utilForm.invalid) {
        if (this.utilForm.get('deskripsiUtil').invalid) {
            this.isDeskripsiValid = false;
        }
        if (this.utilForm.get('tipe').invalid) {
            this.isTipeValid = false;
        }
        return;
    }

    const utilData: UtilDto = {
        id: this.utilForm.get('utilId').value === 'New' ? 0 : this.utilForm.get('utilId').value,
        deskripsi: this.utilForm.get('deskripsiUtil').value,
        tipe: (this.utilForm.get('tipe').value).id
    };

    this.utilsService
    .save(utilData)
    .pipe(first())
    .subscribe(
        (response) => {
            this.utilsService.getUtils().subscribe();
            this.isAlertClosed = false;
            this.alertMessage = 'Util saved successfully';
            this.alertType = 'success';
        },
        (error) => {
            console.log('error saved util');
            this.isAlertClosed = false;
            this.alertMessage = 'Error saved util';
            this.alertType = 'danger';
        }
    );

  }

  public getDeskripsiClass() {
      return this.isDeskripsiValid ? 'form-control' : 'form-control is-invalid';
  }

  public getTipeClass() {
    return this.isTipeValid ? 'form-control' : 'form-control is-invalid';
  }
}
