import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from './../../admin.service';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  providers: [MessageService]
})
export class AddUserComponent implements OnInit {

  form: FormGroup | any;

  errorMessages = {
    fullName: [{ type: 'required', message: 'وارد کردن نام نماینده ضروری می باشد.' }],
    mobile: [{ type: 'required', message: 'وارد کردن شماره موبایل ضروری می باشد.' }],
    email: [{ type: 'required', message: 'آدرس ایمیل اشتباه می باشد.' }],
    companyName: [{ type: 'required', message: ' نام شخص سفارش دهنده (هماهنگ کننده)را وارد کنید.' }],
    postalCode: [{ type: 'required', message: 'کد پستی را وارد کنید.' }],
    address: [{ type: 'required', message: 'آدرس را وارد کنید.' }],
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
      mobile: new FormControl(null),
    });
  }


  submitForm(): void {
    this.service
      .authUser(this.localStorage.userToken, this.form.value)
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

