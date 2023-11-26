import { AdminService } from './../../admin.service';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-administrator-add',
  templateUrl: './administrator-add.component.html',
  styleUrls: ['./administrator-add.component.scss'],
  providers: [MessageService],
})

export class AdministratorAddComponent implements OnInit {
  form: FormGroup | any;
  selectedItems: any[] | any;

  errorMessages = {
    userName: [{ type: 'required', message: 'نام کاربری را وارد کنید.' }],
    password: [{ type: 'required', message: 'رمز عبور را وارد کنید.' }],
    fullName: [
      { type: 'required', message: 'نام و نام خانوادگی را وارد کنید.' },
    ],
  };

  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private service: AdminService,
    public ref: DynamicDialogRef) {

  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      userName: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
      password: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
      fullName: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
      image: new FormControl(null),
    });
  }

  onFileUpload(event: any): void {
    const file: File = event.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    this.service
      .upload(formData)
      .subscribe((response: { success: boolean; imagePath: any; data: any; }) => {
        if (response.success === true) {
          this.form.controls.image.setValue(response.imagePath);
          this.messageService.add({
            severity: 'success',
            summary: 'آپلود فایل',
            detail: 'آپلود شد.',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'آپلود تصویر ',
            detail: response.data,
          });
        }
      });
  }


  submitForm(): void {
    this.form.patchValue({
      accessLevel: this.selectedItems,
    });
    this.service
      .addAdmin(this.localStorage.userToken, this.form.value)
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
