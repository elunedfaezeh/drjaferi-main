import { Component, OnInit } from '@angular/core';
import { TokenService } from './../../../auth/token.service';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { AdminService } from './../admin.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AddUserComponent } from './add-user/add-user.component';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { EditUserComponent } from './edit-user/edit-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  number = 15;
  testStyle: any;

  constructor(
    private messageService: MessageService,
    private dialogService: DialogService,
    private service: AdminService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): any {
    this.service.getUsers(this.localStorage.userToken).subscribe((response: any) => {
      if (response.success === true) {
        this.users = response.data;
      } else {
        //  this.token.checkTokenExamination(response.data, 'admin');
      }
    });
  }


  show() {
    const ref = this.dialogService.open(AddUserComponent, {
      header: 'افزودن کاربر',
      width: '90%',
      style:{"font-family": "IRANSans_Bold"}

    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت اطلاعات ',
          detail: 'اطلاعات با موفقیت ثبت شد.',
        });
        this.getUsers();
      }
    });
  }

  showEdit(id: string): void {
    let user = this.users.filter((x) => x._id == id)[0];
    const ref = this.dialogService.open(EditUserComponent, {
      data: {
        user,
      },
      header: 'ویرایش کاربر',
      width: '90%',
      style:{"font-family": "IRANSans_Bold"}
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ویرایش اطلاعات ',
          detail: 'اطلاعات با موفقیت ویرایش شد.',
        });
        this.getUsers();
      }
    });
  }


  deleteUser(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        this.service.deleteUser(this.localStorage.userToken, id).subscribe((response: any) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({
              severity: 'success',
              summary: ' حذف اطلاعات ',
              detail: response.data,
            });
            this.getUsers();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: ' حذف اطلاعات ',
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
