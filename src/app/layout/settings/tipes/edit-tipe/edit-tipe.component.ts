import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { TipeDto } from '../../../../core/dto/tipe.dto';
import { StorageConstants } from '../../../../shared/constants/storage.constants';
import { TipesService } from '../../../../core/services/tipes.service';
import { routerTransition } from '../../../../router.animations';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-tipe',
  templateUrl: './edit-tipe.component.html',
  styleUrls: ['./edit-tipe.component.css'],
  animations: [routerTransition()]
})
export class EditTipeComponent implements OnInit {
    public tipeForm: FormGroup;
    public isAlertClosed: Boolean = true;
    public alertMessage: String = '';
    public alertType: String = 'success';
    private isDeskripsiValid: Boolean = true;
    private editHeader: String;

    constructor(private route: ActivatedRoute, private tipesService: TipesService, private storage: StorageMap) {
        this.tipeForm = new FormGroup({
            tipeId: new FormControl(),
            namaTipe: new FormControl(null, [Validators.required])
        });
    }

    ngOnInit(): void {
        const tipeId = +this.route.snapshot.paramMap.get('id');
        if (tipeId === 0) {
            this.tipeForm.patchValue({
                tipeId: 'New',
                namaTipe: ''
            });
            this.editHeader = 'Buat Tipe Baru';
        } else {
            this.storage.get(StorageConstants.SETTINGS_TIPES).subscribe((tipeList: TipeDto[])  => {
                if (tipeList) {
                    tipeList.filter(tipe => tipe.id === tipeId).map(tipe => {
                        this.tipeForm.patchValue({
                            tipeId: tipe.id.toString(),
                            namaTipe: tipe.nama
                        });
                        this.editHeader = 'Edit Tipe';
                    });
                }
            });
        }
    }

    onFormSubmit() {
        this.isDeskripsiValid = true;
        if (this.tipeForm.invalid) {
            if (this.tipeForm.get('namaTipe').invalid) {
                this.isDeskripsiValid = false;
            }
            return;
        }

        const tipeData: TipeDto = {
            id: this.tipeForm.get('tipeId').value === 'New' ? 0 : this.tipeForm.get('tipeId').value,
            nama: this.tipeForm.get('namaTipe').value,
        };

        this.tipesService
            .save(tipeData)
            .pipe(first())
            .subscribe(
                (response) => {
                    this.tipesService.getTipes().subscribe();
                    this.isAlertClosed = false;
                    this.alertMessage = 'Tipe saved successfully';
                    this.alertType = 'success';
                },
                (error) => {
                    console.log('error saved tipe');
                    this.isAlertClosed = false;
                    this.alertMessage = 'Error saved tipe';
                    this.alertType = 'danger';
                }
            );
    }

    public getDeskripsiClass() {
        return this.isDeskripsiValid ? 'form-control' : 'form-control is-invalid';
    }

    public getHeaderTitle() {
        return this.editHeader;
    }
}
