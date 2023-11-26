import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LayoutService } from '../../layout.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [MessageService]
})
export class ContactComponent implements OnInit {
  form: FormGroup | any;

  constructor(private service: LayoutService,
    private messageService: MessageService) {}

  ngOnInit(): void {
    this.createform();
  }
  errorMessages = {
    mobile: [{ type: 'required', message: ' *شماره همراه را وارد کنید.' },
    { type: 'maxlength', message: ' *شماره موبایل باید 11 رقم باشد' },
    { type: 'minlength', message: ' *شماره موبایل باید 11 رقم باشد' },
    ],
    email: [{ type: 'required', message: ' *ایمیل را وارد کنید.' }],
    title: [{ type: 'required', message: ' *عنوان را وارد کنید.' }],
    fullName: [{ type: 'required', message: ' *نام و نام خانوادگی را وارد کنید.' }],
    message: [{ type: 'required', message: ' *پیغام را وارد کنید.' },
  ],

  };

  addContactMessage() {
    if(this.form.controls.mobile.value==null){
      this.messageService.add({
              severity: 'error',
              summary: ' شماره همراه را وارد کنید  .',
            });
    }else if(this.form.controls.email.value==null){
      this.messageService.add({
              severity: 'error',
              summary: '  ایمیل را وارد کنید  .',
            });
          }
          else if(this.form.controls.fullName.value==null){
            this.messageService.add({
                    severity: 'error',
                    summary: '  نام و نام خانوادگی را وارد کنید  .',
                  });
                }
                else if(this.form.controls.title.value==null){
                  this.messageService.add({
                          severity: 'error',
                          summary: ' موضوع را وارد کنید  .',
                        });
                      }
                      else if(this.form.controls.message.value==null){
                        this.messageService.add({
                                severity: 'error',
                                summary: '  پیغام را وارد کنید  .',
                              });
                            }
            else{
              this.service.addContactMessage(this.form.value)
              .subscribe((response: any) => {
                if (response.success === true) {
                  this.messageService.add({
                    severity: 'success',
                    summary: ' ثبت شد'
                  })
                  this.form.controls['fullName'].reset();
                  this.form.controls['mobile'].reset();
                  this.form.controls['email'].reset();
                  this.form.controls['message'].reset();
                  this.form.controls['title'].reset()
                  console.log(response);
                } else {
                  this.messageService.add({
                    severity: 'error',
                    summary: ''
                  })
                }
              });
            }
    
  }
  createform() {
    this.form = new FormGroup({
      mobile: new FormControl(null, Validators.compose([Validators.required])),
      fullName: new FormControl(null, Validators.compose([Validators.required])),
      email: new FormControl(null, Validators.compose([Validators.required])),
      title: new FormControl(null, Validators.compose([Validators.required])),
      message: new FormControl(null, Validators.compose([Validators.required]))
    })
  }

}

