import { GalleryAddComponent } from './gallery-add/gallery-add.component';
import { DialogService } from 'primeng/dynamicdialog';
import { AdminService } from './../admin.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './../../../auth/local-storage.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService],
})
export class GalleryComponent implements OnInit {
  images: any[] | any;

  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private localStorage: LocalStorageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) { }


  ngOnInit(): void {
    this.getGallery();

  }

  getGallery(): any {
    this.service.getGallery(this.localStorage.userToken).subscribe((response: any) => {
      if (response.success === true) {
        this.images = response.data;
        console.log(this.images);

      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت اطلاعات ',
          detail: response.data,
        });
      }
    });
  }


  showAddGalleryDialog(): void {
    const ref = this.dialogService.open(GalleryAddComponent, {
      header: 'ثبت گالری',
      width: '90%',
      style: { "font-family": "IRANSans_Light" },
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: 'ثبت شد ',

        });
        this.getGallery();
      }
    });
  }

  deleteGallery(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        this.service
          .deleteGallery(this.localStorage.userToken, id)
          .subscribe((response: any) => {
            if (response.success === true) {
              this.confirmationService.close();
              this.messageService.add({
                severity: 'success',
                summary: 'حذف شد',
                detail: response.data,
              });
              this.getGallery()
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'حذف نشد',
                detail: response.data,
              });
            }
          });
      },
      reject: () => {
        // close
        this.confirmationService.close();
      },
    });
  }


}
