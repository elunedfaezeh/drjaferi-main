import { Component, OnInit } from '@angular/core';
import { TokenService } from './../../../auth/token.service';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { AdminService } from './../admin.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { OrderComponent } from './order/order.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService]
})

export class OrdersComponent implements OnInit {
  orders: any[] = [];
  constructor(
    private messageService: MessageService,
    private dialogService: DialogService,
    private service: AdminService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): any {
    this.service.getOrders(this.localStorage.userToken).subscribe((response: any) => {
      if (response.success === true) {
        this.orders = response.data;
      } else {
        this.token.checkTokenExamination(response.data, 'admin');
      }
    });
  }

  showAdd() {
    const ref = this.dialogService.open(AddOrderComponent, {
      header: 'افزودن سفارش',
      width: '95%',
      style: { "font-family": "IRANSans_Bold" }
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت شد ',
        });
        this.getOrders();
      }
    });
  }

  show(id: string): void {
    let order = this.orders.filter((x) => x._id == id)[0];
    const ref = this.dialogService.open(OrderComponent, {
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
        this.getOrders();
      }
    });
  }

  deleteOrder(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        this.service.deleteOrder(this.localStorage.userToken, id).subscribe((response: any) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({
              severity: 'success',
              summary: ' حذف شد ',
            });
            this.getOrders();
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
