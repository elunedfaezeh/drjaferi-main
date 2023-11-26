import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AddOrderComponent } from './add-order/add-order.component';
import { MessageService } from 'primeng/api';
import { LocalStorageService } from 'src/app/auth/local-storage.service';
import { TokenService } from 'src/app/auth/token.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { ViewOrderComponent } from './view-order/view-order.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  providers: [ConfirmationService, DialogService, MessageService]
})
export class OrderListComponent implements OnInit {
  orders: any[] = [];
  constructor(
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private localStorage: LocalStorageService,
    private service: UserService,
    private token: TokenService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getOrdersByUser();
  }

  getOrdersByUser(): any {
    this.service.getOrdersByUser(this.localStorage.userToken, this.localStorage.userID).subscribe((response: any) => {
      if (response.success === true) {
        this.orders = response.data;
      } else {
        this.token.checkTokenExamination(response.data, 'user');
      }
    });
  }

  showEdit(id: string): void {
    let order = this.orders.filter((x) => x._id == id)[0];
    const ref = this.dialogService.open(EditOrderComponent, {
      data: {
        order,
      },
      header: 'ویرایش سفارش',
      width: '95%',
      style: { "font-family": "IRANSans_Bold" }
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ویرایش شد ',
        });
        this.getOrdersByUser();
      }
    });
  }

  showAdd() {
    const ref = this.dialogService.open(AddOrderComponent, {
      header: 'افزودن سفارش',
      width: '90%',
      style: { "font-family": "IRANSans_Bold" }
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت شد',
        });
        this.getOrdersByUser();
      }
    })
  }

  show(id: string): void {
    let order = this.orders.filter((x) => x._id == id)[0];
    const ref = this.dialogService.open(ViewOrderComponent, {
      data: {
        order,
      },
      header: 'نمایش سفارش',
      width: '95%',
      style: { "font-family": "IRANSans_Bold" }
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {

      }
    });
  }
  cancelOrder(id: any): void {
    let data = { status: "لغو شد" };
    this.confirmationService.confirm({
      message: 'آیا از لغو سفارش مطمئن هستید؟',
      header: 'تایید لغو',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        this.service.editOrder(this.localStorage.userToken, id, data).subscribe((response: any) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({
              severity: 'success',
              summary: ' لغو شد ',
            });
            this.getOrdersByUser();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'خطا',
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

