import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user.component';
import { InfoComponent } from './info/info.component';
import { OrderListComponent } from './order-list/order-list.component';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { OrderComponent } from '../admin/orders/order/order.component';


const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
    ],
  },
  {
    path: 'info',
    component: UserComponent,
    children: [
      {
        path: '',
        component:InfoComponent,
      },
    ],
  },
  {
    path: 'order-list',
    component: UserComponent,
    children: [
      {
        path: '',
        component:OrderListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }