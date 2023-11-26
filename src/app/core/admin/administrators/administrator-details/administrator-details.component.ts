import { AdminService } from './../../admin.service';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-administrator-details',
  templateUrl: './administrator-details.component.html',
  styleUrls: ['./administrator-details.component.scss'],
  providers: [MessageService],
})
export class AdministratorDetailsComponent implements OnInit {
  admin: any;
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private localStorage: LocalStorageService,
    private service: AdminService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.admin = this.config.data.admin;
  }

  cancel() {
    this.ref.close();
  }
}
