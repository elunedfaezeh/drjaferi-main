import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LocalStorageService } from 'src/app/auth/local-storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  password: string | any;
  form: FormGroup | any;
  errorMessages = {
    userName: [{ type: 'required', message: 'نام کاربری را وارد کنید.' }],
    password: [{ type: 'required', message: 'رمز عبور را وارد کنید.' }],
  };

  constructor(
    private service: AdminService,
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.localStorage.getCurrentUser() && this.localStorage.userType == 'admin') {
      this.router.navigateByUrl('/admin');
    }

    this.form = new FormGroup({
      userName: new FormControl(null, Validators.compose([Validators.required])),
      password: new FormControl(null, Validators.compose([Validators.required])),
    });
  }

  login(): void {
    this.service.login(this.form.value).subscribe((result: { success: boolean; data: any; }) => {
      if (result.success == true) {
        console.log(result)
        this.localStorage.removeCurrentUser();
        this.localStorage.saveCurrentUser(JSON.stringify(result.data));
        this.router.navigateByUrl('/admin/panel');
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'خطا',
          detail: 'نام کاربری یا کلمه عبور صحیح نمی باشد.',
        });
      }
    });
  }
}
