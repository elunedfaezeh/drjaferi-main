import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserRoutingModule } from './user-routing.component';
import { MatrialListModule } from '../../matrial-list.module';
import { PrimengListModule } from '../../primeng-list.module';
import { UserComponent } from './user.component';
import { InfoComponent } from './info/info.component';
import { OrderListComponent } from './order-list/order-list.component';
import { AddOrderComponent } from './order-list/add-order/add-order.component';
import { EditOrderComponent } from './order-list/edit-order/edit-order.component';
import { ViewOrderComponent } from './order-list/view-order/view-order.component';
import {NgxPrintModule} from 'ngx-print';

@NgModule({
  declarations: [
    DashboardComponent,
     UserComponent,
     InfoComponent,
     OrderListComponent,
     AddOrderComponent,
     EditOrderComponent,
     ViewOrderComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    PrimengListModule,
    MatrialListModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class UserModule { }
