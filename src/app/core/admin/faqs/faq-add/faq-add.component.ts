import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../admin.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './../../../../auth/local-storage.service';

@Component({
  selector: 'app-faq-dialog',
  templateUrl: './faq-add.component.html',
  styleUrls: ['./faq-add.component.scss'],
  providers: [MessageService]
})
export class FaqAddComponent implements OnInit {
  public form: FormGroup | any;
  errorMessages = {
    question: [
      { type: 'required', message: 'سوال را وارد کنید.' },
    ],
    reply: [
      { type: 'required', message: 'پاسخ را وارد کنید.' },
    ]
  };

  constructor(
    private localStorage: LocalStorageService,
    private service: AdminService,
    public ref: DynamicDialogRef,
    public messageService: MessageService,
    public config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.createform();
  }

  createform(): void {
    this.form = new FormGroup({
      question: new FormControl(null, [Validators.required]),
      reply: new FormControl(null, [Validators.required])
    });
  }

  submitForm(): void {
    this.service.addFaq(this.localStorage.userToken, this.form.value).subscribe((response: any) => {
      if (response.success === true) {
        this.ref.close(true);
      } else {
        this.messageService.add({ severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data });
      }
    });
  }

}
