import { Component } from '@angular/core';
import { TokenService } from './../../../auth/token.service';
import { UserService } from './../user.service';
import { MessageService } from 'primeng/api';
import { LocalStorageService } from 'src/app/auth/local-storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  providers: [MessageService]
})

export class InfoComponent {
  value = 1;
  form: FormGroup | any;
  mobile: any;
  user: any;
  errorMessages = {
    fullName: [{ type: 'required', message: 'وارد کردن نام و نام خانوادگی ضروری می باشد.' }],
    email: [{ type: 'required', message: 'آدرس ایمیل اشتباه می باشد.' }],
  };

  constructor(
    private router: Router,
    private service: UserService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    if (this.localStorage.getCurrentUser()) {
      this.createForm();
      this.mobile = this.localStorage.userMobile;
    } else {
      this.localStorage.removeCurrentUser();
      this.router.navigateByUrl('/user')
    }
  }

  createForm() {
    this.form = new FormGroup({
      mobile: new FormControl(this.localStorage.userMobile),
      fullName: new FormControl(this.localStorage.userFullName),
      phone: new FormControl(this.localStorage.userPhone),
      email: new FormControl(this.localStorage.userEmail),
      address: new FormControl(this.localStorage.userAddress),
      postalCode: new FormControl(this.localStorage.userPostalCode),
      companyName: new FormControl(this.localStorage.userCompanyName),
    });
    this.form.controls.mobile.disable();
  }

  submitForm(): void {
    this.service
      .editUser(this.localStorage.userToken, this.localStorage.userID, this.form.value)
      .subscribe((response: any) => {
        if (response.success === true) {
          this.messageService.add({
            severity: 'success',
            summary: ' ثبت شد',
          });
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
