import { Router } from '@angular/router';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AdminService } from './../../admin.service';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrator-security',
  templateUrl: './administrator-security.component.html',
  styleUrls: ['./administrator-security.component.scss'],
  providers: [MessageService],
})
export class AdministratorSecurityComponent implements OnInit {
  admin: any;
  usernameForm: FormGroup | any;
  passwordForm: FormGroup | any;
  usernameErrorMessages = {
    userName: [{ type: 'required', message: 'نام کاربری را وارد کنید.' }],
  };
  passwordErrorMessages = {
    password: [{ type: 'required', message: 'رمز عبور را وارد کنید.' }],
  };
  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private service: AdminService,
    private router: Router,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.admin = this.config.data.admin;
    this.createForm();
  }

  createForm() {
    this.usernameForm = new FormGroup({
      userName: new FormControl(
        this.admin.userName,
        Validators.compose([Validators.required])
      ),
    });
    this.passwordForm = new FormGroup({
      password: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
    });
  }

  changeUsername(): void {
    this.service
      .editAdmin(
        this.localStorage.userToken,
        this.admin._id,
        this.usernameForm.value
      )
      .subscribe((response: { success: boolean; data: any; }) => {
        if (response.success === true) {
          if (this.localStorage.userID === this.admin._id) {
            this.localStorage.removeCurrentUser();
            this.router.navigateByUrl('[/admin]');
          } else {
            this.ref.close(true);
          }
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'خطا',
          });
        }
      });
  }

  changePassword(): void {
    this.service
      .editAdmin(
        this.localStorage.userToken,
        this.admin._id,
        this.passwordForm.value
      )
      .subscribe((response: { success: boolean; data: any; }) => {
        if (response.success === true) {
          if (this.localStorage.userID === this.admin._id) {
            this.localStorage.removeCurrentUser();
            this.router.navigateByUrl('[/admin]');
          } else {
            this.ref.close(true);
          }
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
