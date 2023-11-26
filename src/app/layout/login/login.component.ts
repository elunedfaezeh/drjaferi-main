import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LayoutService } from '../layout.service';
import { LocalStorageService } from 'src/app/auth/local-storage.service';
import { Message } from 'primeng/api';

import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup | any;
  verifyForm: FormGroup | any;
  returnPath: any;
  code = "";
  display = false;
  timer = 90;
  invalidSMS: boolean = false;
  resendSMS: boolean = false;
  interval: any;

  messages: Message[] | any;

  constructor(
    private service: LayoutService,
    private router: Router,
    private localStorage: LocalStorageService,
    private rout: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.createform();
    switch (window.history.state.route) {
      case '':
        this.returnPath = '/user';
        break;
      case 'order':
        this.returnPath = '/order';
        break;
      case 'survey':
        this.returnPath = '/survey';
        break;
      default:
        this.returnPath = '/user';
    }
  }

  errorMessages = {
    mobile: [{ type: 'required', message: ' *شماره همراه را وارد کنید' },
    { type: 'maxlength', message: ' شماره موبایل باید 11 رقم باشد' },
    { type: 'minlength', message: ' شماره موبایل باید 11 رقم باشد' }],
  };

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.invalidSMS = false;
        this.resendSMS = true;
        this.timer = 0;
        this.code = "";
      }
    }, 1000);
  }

  randomNumber() {
    var text = '';
    var possible = '123456789';
    for (var i = 0; i < 5; i++) {
      var sup = Math.floor(Math.random() * possible.length);
      text += i > 0 && sup == i ? '0' : possible.charAt(sup);
    }
    return text;
  }

  sendSMS() {
    this.display = true;
    this.code = this.randomNumber();
    // let data = {
    //   "Mobile": this.form.value.mobile,
    //   "TemplateId": 100000,
    //   "Parameters": [
    //     {
    //       "Name": "Code",
    //       "Value": this.code
    //     }
    //   ]
    // };
    // this.service.sendSms(data).subscribe((result: any) => {
    //   if (result.status === 1) {
        this.invalidSMS = false;
        this.timer = 90;
        this.resendSMS = false;
        clearInterval(this.interval);
        this.startTimer();
    //   } else {
    //     console.log("شماره را به درستی وارد کنید");
    //   }
    // });

  }

  onVerifyCode() {
    if (this.verifyForm.value.code !== this.code) {
      this.invalidSMS = true;
    } else {
      this.invalidSMS = false;
      this.login();
    }
  }

  login() {
    this.service.authUser(this.form.value).subscribe((result: any) => {
      if (result.success === true) {
        console.log(result.data);

        this.localStorage.removeCurrentUser();
        this.localStorage.saveCurrentUser(JSON.stringify(result.data));
        this.router.navigateByUrl(this.returnPath);
      } else {
        console.log('eror')
      }
    });
  }

  createform() {
    this.form = new FormGroup({
      mobile: new FormControl(null, Validators.compose([Validators.required])),
    })
    this.verifyForm = new FormGroup({
      code: new FormControl(null, Validators.compose([Validators.required])),
    })
  }
}
