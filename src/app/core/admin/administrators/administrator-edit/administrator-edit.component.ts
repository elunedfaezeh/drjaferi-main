import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from './../../admin.service';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-administrator-edit',
  templateUrl: './administrator-edit.component.html',
  styleUrls: ['./administrator-edit.component.scss'],
  providers: [MessageService]
})
export class AdministratorEditComponent implements OnInit {
  admin: any;
  form: FormGroup | any;
  errorMessages = {
    fullName: [
      { type: 'required', message: 'نام و نام خانوادگی را وارد کنید.' },
    ],
  };

  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private service: AdminService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    
  }


  ngOnInit(): void {
    this.admin = this.config.data.admin;
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      fullName: new FormControl(this.admin.fullName, Validators.compose([Validators.required])),
      image: new FormControl(this.admin.image),
    });
  }

  onFileUpload(event: any): void {
    const file: File = event.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    this.service
      .upload(formData)
      .subscribe((response:any) => {
        if (response.success === true) {
          this.form.controls.image.setValue(response.imagePath);
          this.messageService.add({
            severity: 'success',
            summary: ' آپلود شد',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'خطا',
          });
        }
      });
  }

  submitForm(): void {
    this.service
      .editAdmin(this.localStorage.userToken, this.admin._id, this.form.value)
      .subscribe((response: { success: boolean; data: any; }) => {
        if (response.success === true) {
          this.ref.close(true);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' ثبت اطلاعات ',
            detail: response.data,
          });
        }
      });
  }
}
