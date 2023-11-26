import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from './../../../auth/token.service';
import { LayoutService } from '../../layout.service';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { MessageService, SelectItem } from 'primeng/api';

@Component({
  selector: 'app-order',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss'],
  providers: [MessageService]
})

export class OrderInfoComponent {
  form: FormGroup | any;
  case!: SelectItem[];
  selectedReason!: string;
  reasonNames = ['دعاوی مدنی', 'دعاوی کیفری', 'دعاوی خانوادگی', 'دعاوی ثبتی'];
  reason = this.reasonNames.map((val, i, _reasonNames) => {
    return { label: val, value: val }
  });
  caseNames = [
    { reason:'دعاوی مدنی', case: 'مطالبه سهم الارث' },
    { reason: ' دعاوی مدنی', case: 'مهر و موم ترکه' },
    { reason: 'دعاوی مدنی', case: 'تحریر ترکه' },
    { reason: 'دعاوی مدنی', case: 'تفسیر ترکه' },
    { reason: 'دعاوی مدنی', case: 'اثبات مالکیت' },
    { reason: 'دعاوی مدنی', case: 'خلع ید' },
    { reason: 'دعاوی مدنی', case: 'رفع تصرف عدوانی' },
    { reason: 'دعاوی مدنی', case: 'مطالبه اجرت المثل ایام تصرف' },
    { reason: 'دعاوی مدنی', case: 'رفع مزاحمت' },
    { reason: 'دعاوی مدنی', case: 'ممانت از حق' },
    { reason: 'دعاوی مدنی', case: 'ابطال سند رسمی' },
    { reason: 'دعاوی مدنی', case: 'مطالبه اجاره بها' },
    { reason: 'دعاوی مدنی', case: 'تخلیه ملک' },
    { reason: 'دعاوی مدنی', case: 'اسناد تجاری' },
    {reason: 'دعاوی مدنی', case: 'چک'}, 
    {reason: 'دعاوی مدنی', case: 'سفته'}, 
    {reason: 'دعاوی مدنی', case: 'مطالب طلب'},
    {reason: 'دعاوی مدنی', case: 'دعاوی راجب به اسناد تجاری'}, 
    {reason: 'دعاوی مدنی', case: 'دعاوی شرکتها'},
    {reason: 'دعاوی مدنی', case: 'اعلان ورشکستگی شرکت ها'},
    {reason: 'دعاوی مدنی', case: 'مطالبه سود سهام و...'},
    {reason: 'دعاوی کیفری', case: 'قتل عمد'}, 
    {reason: 'دعاوی کیفری', case: 'کلاهبرداری'}, 
    {reason: 'دعاوی کیفری', case: 'مواد مخدر'},
    {reason:'دعاوی کیفری', case: 'سرقت'}, 
    {reason: 'دعاوی کیفری', case: 'خیانت در امانت'},
    {reason: 'دعاوی کیفری', case: 'تحصیل مال از طریق نا مشروع'},
    {reason: 'دعاوی کیفری', case: 'جعل و استفاده از سند مجعول'},
    {reason: 'دعاوی کیفری', case: 'تصادفات '}, 
    {reason: 'دعاوی کیفری', case: 'مطالبه دیه و...'}, 
    {reason: 'دعاوی خانوادگی', case: 'مطالبه مهریه'},
    {reason:'دعاوی خانوادگی', case: 'اجرت المثل ایام زوجیت'}, 
    {reason: 'دعاوی خانوادگی', case: 'طلاق توافقی'},
    {reason: 'دعاوی خانوادگی', case: 'طلاق به درخواست زوجه'},
    {reason: 'دعاوی خانوادگی', case: 'اثبات زوجیت'},
    {reason: 'دعاوی خانوادگی', case: 'اثبات نسب'},
    {reason:'دعاوی خانوادگی', case: 'تمکین'}, 
    {reason: 'دعاوی خانوادگی', case: 'مطالبه نفقه و ...'},
    {reason: 'دعاوی ثبتی', case: 'ابطال سند رسمی'},
    {reason: 'دعاوی ثبتی', case: 'ابطال اجراییه ثبتی'},
    {reason: 'دعاوی ثبتی', case: 'اعتراض به عملیات ثبتی'},
    {reason: 'دعاوی ثبتی', case: 'اعتراض به اجراییه صادره از طریق بانک ها و ابطال عملیات ثبتی آن'},
    {reason: 'دعاوی ثبتی', case: 'اعتراض به عملیات تحدید و حدود'},
    {reason: 'دعاوی ثبتی', case: 'حقوق ارفاقی و ...'},
   ];


  errorMessages = {
    reason: [{ type: 'required', message: ' علت مراجعه را انتخاب کنید.' }],
    case: [{ type: 'required', message: '  نوع پرونده را انتخاب کنید.' }],
    kind: [{ type: 'required', message: 'نوع مشاوره را انتخاب کنید.' }]
  };

  kind = [
    { title: "مشاوره انلاین" },
    { title: "مشاوره حضوری" },
  ];
  constructor(
    private router: Router,
    private service: LayoutService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private messageService: MessageService,

  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getCases(this.selectedReason);
  }
  getCases(state: string): any[] {
    return this.case = this.caseNames
      .filter((el) => { return el.reason === state; })
      .map((el) => { return { label: el.case, value: el.case }; });
  }


  createForm() {
    this.form = new FormGroup({
      userID: new FormControl(this.localStorage.userID),
      reason: new FormControl(null),
      case: new FormControl(null),
      kind: new FormControl(null),

    });
  }

  submitForm(): void {
    this.service.addOrder(this.localStorage.userToken, this.form.value).subscribe((response: any) => {
      if (response.success === true) {
        this.sendSms(response.data.code);
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت شد',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'خطا در ثبت اطلاعات',
        });
      }
    });
    if(this.form.controls.case.value==null){
      this.messageService.add({
              severity: 'error',
              summary: 'نوع پرونده را انتخاب کنید.',
            });
    }else if(this.form.controls.reason.value==null){
      this.messageService.add({
              severity: 'error',
              summary: 'علت مراجعه به وکیل را انتخاب کنید.',
            });
    } else if(this.form.controls.kind.value==null){
      this.messageService.add({
              severity: 'error',
              summary: 'نوع مشاوره را انتخاب کنید.',
            });
    }
    else{
    this.router.navigateByUrl('/order/time');
   } 
  }

  sendSms(code: any) {
    let data = {
      "Mobile": "09165517882",
      "TemplateId": 925342,
      "Parameters": [
        {
          "Name": "Code",
          "Value": code
        }
      ]
    };
    this.service.sendSms(data).subscribe((result: any) => {
      if (result.status === 1) {

      } else {
        console.log("شماره را به درستی وارد کنید");
      }
    });
  }
}






