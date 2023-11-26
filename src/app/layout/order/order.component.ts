import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-order-steps',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [MessageService]
})
export class OrderComponent {
  items: MenuItem[] | any;
  activeIndex = 0
  constructor(public messageService: MessageService) { }
  ngOnInit() {
    this.items = [
      {
        label: ' مشاوره حقوقی',
        icon: 'pi pi-user',
        routerLink: 'orderinfo'
      },
      {
        label: 'وقت ملاقات',
        icon: 'pi pi-shopping',
        routerLink: 'time'
      },
      {
        label: 'تکمیل مشخصات',
        icon: 'pi pi-user',
        routerLink: 'userinfo'
      },
      {
        label: ' پرداخت انلاین',
        icon: 'pi pi-user',
        routerLink: 'payment'
      },
   
    ];
  }

}
