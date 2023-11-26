import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../admin.service';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicDialogRef ,DynamicDialogConfig} from 'primeng/dynamicdialog';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit{
  user: any;
  form: FormGroup | any;
  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private service: AdminService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig) {
  }
  ngOnInit(): void {
    this.user = this.config.data.user;
   this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      mobile: new FormControl(this.user.mobile),
      fullName: new FormControl(this.user.fullName),
      phone: new FormControl(this.user.phone),
      email: new FormControl(this.user.email),
      address: new FormControl(this.user.address),
      postalCode: new FormControl(this.user.postalCode),
      companyName: new FormControl(this.user.companyName),
      image: new FormControl(null),
    });
  }
  submitForm(): void {
    this.service
      .editUser(this.localStorage.userToken, this.user._id, this.form.value)
      .subscribe((response:any) => {
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
    
  onFileUpload(event:any) {
    const formData = new FormData();
    formData.append('file', event.files[0], event.files[0].name);
    this.service
      .upload(formData)
      .subscribe((response:any) => {
        if (response.success === true) {
          this.form.controls.image.setValue(response.imagePath);
          this.messageService.add({
            severity: 'success',
            summary: ' آپلود تصویر محصول ',
            detail: 'تصویر با موفقیت آپلود شد.',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' آپلود تصویر محصول ',
            detail: response.data,
          });
        }
      });
  }

}

