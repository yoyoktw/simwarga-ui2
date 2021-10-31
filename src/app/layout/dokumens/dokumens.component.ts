import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';
import { DokumenService } from '../../core/services/dokumen.service';
import { routerTransition } from '../../router.animations';
import { ListDokumenService } from './service/list-dokumens.service';
import { DokumensHeaderDirective, SortEvent } from './util/dokumens-sortable.directive';
import { ListDokumen } from './util/list-dokumens';

@Component({
  selector: 'app-dokumens',
  templateUrl: './dokumens.component.html',
  styleUrls: ['./dokumens.component.css'],
  animations: [routerTransition()],
  providers: [ListDokumenService, DecimalPipe]
})
export class DokumensComponent implements OnInit {
  public searchForm: FormGroup;
  public wargaKKList;

  closeResult: string;

  public imagePath: any;

  // tslint:disable-next-line: member-ordering
  dokumens$: Observable<ListDokumen[]>;
  // tslint:disable-next-line: member-ordering
  total$: Observable<number>;

  // tslint:disable-next-line: member-ordering
  @ViewChildren(DokumensHeaderDirective) headers: QueryList<DokumensHeaderDirective>;

  constructor(public service: ListDokumenService,
    private storage: StorageMap,
    private dokumenService: DokumenService,
    private modalService: NgbModal) {
    this.dokumens$ = service.dokumens$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
  }

  onSort({column, direction}: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  createImageFromBlob(image: Blob, content: any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        this.imagePath = reader.result;

        const modalOption: NgbModalOptions = {
            centered: true,
            scrollable: true,
            size: 'lg'
        };

        this.modalService.open(content, modalOption).result.then(
            (result) => {
                this.closeResult = `Closed with: ${result}`;
            },
            (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );

    }, false);
    if (image) {
       reader.readAsDataURL(image);
    }
  }

  open(content: any, url: string) {
      this.dokumenService.getDokumenByUrl(url).subscribe((baseImage: any) => {
          this.createImageFromBlob(baseImage, content);
      },
      (error) => {
          alert('File tidak ditemukan...');
      }
      );
  }

  private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
      } else {
          return `with: ${reason}`;
      }
  }
}
