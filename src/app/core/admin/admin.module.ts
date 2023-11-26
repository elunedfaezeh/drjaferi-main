import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatrialListModule } from '../../matrial-list.module';
import { PrimengListModule } from '../../primeng-list.module';
import { AdminRoutingModule } from './admin-routing.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { OrdersComponent } from './orders/orders.component';
import { AddOrderComponent } from './orders/add-order/add-order.component';
import { EditOrderComponent } from './orders/edit-order/edit-order.component';
import { AdministratorsComponent } from './administrators/administrators.component';
import { AdministratorAddComponent } from './administrators/administrator-add/administrator-add.component';
import { AdministratorEditComponent } from './administrators/administrator-edit/administrator-edit.component';
import { AdministratorDetailsComponent } from './administrators/administrator-details/administrator-details.component';
import { AdministratorSecurityComponent } from './administrators/administrator-security/administrator-security.component';
import { OrderComponent } from './orders/order/order.component';
import {NgxPrintModule} from 'ngx-print';
import { FaqsComponent } from './faqs/faqs.component';
import { FaqAddComponent } from './faqs/faq-add/faq-add.component';
import { ContactComponent } from './contact/contact.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryAddComponent } from './gallery/gallery-add/gallery-add.component';
@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    DashboardComponent,
    UsersComponent,
    AddUserComponent,
    EditUserComponent,
    OrdersComponent,
    AddOrderComponent,
    EditOrderComponent,
    AdministratorsComponent,
    AdministratorAddComponent,
    AdministratorEditComponent,
    AdministratorDetailsComponent,
    AdministratorSecurityComponent,
    OrderComponent,
    FaqsComponent,
    FaqAddComponent,
    ContactComponent,
    GalleryComponent,
    GalleryAddComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    PrimengListModule,
    MatrialListModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
