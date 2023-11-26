import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/auth/token.service';
import { UserService } from '../../user.service';
import { LocalStorageService } from 'src/app/auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
  providers: [MessageService]
})
export class AddOrderComponent {
  form: FormGroup | any;

  errorMessages = {
    title: [{ type: 'required', message: 'عنوان را وارد نمایید.' }],
    pcbThickness: [{ type: 'required', message: ' لطفا ضخامت  مدار را وارد کنید.' }],
    material: [{ type: 'required', message: 'جنس برد را انتخاب کنید.' }],
    copperThickness: [{ type: 'required', message: 'ضخامت مس را انتخاب کنید.' }],
    pcbType: [{ type: 'required', message: 'نوع مدار چاپی را انتخاب کنید.' }],
    cover: [{ type: 'required', message: 'پوشش نهایی را انتخاب کنید.' }],
    celeryPrint: [{ type: 'required', message: ' چاپ سلدر را انتخاب کنید.' }],
    partsPrinting: [{ type: 'required', message: ' چاپ قطعات را انتخاب کنید.' }],



  };

  finalCut = [
    { name: 'Punch' },
    { name: 'V-Cut' },
    { name: 'CNC' },
  ];

  materials = [
    { title: "XPC (استخوانی - فنلیک)" },
    { title: "FR1 (استخوانی - فنلیک)" },
    { title: "CEM1 (نیمه فایبرگلاس)" },
    { title: "FR4 (فایبر گلاس)" },
    { title: "AL (آلومینیوم)" }];

  copperThickness = [
    { title: "18µ - 1/2 OZ" },
    { title: "35µ - 1 OZ" },
    { title: "70µ - 1/2 OZ" },
    { title: "سایر" }];

  cover = [
    { title: "HAL(قلع و سرب هموار شده با هوای داغ)" },
    { title: "HAL - free (قلع بدون سرب)" },
    { title: "Liquid flux -Cu-protect coating (معمولی)" },
    { title: "Roller Tinning  قلع و سرب | قلع به روش غلتکی)" },
    { title: "Gold plating (آبکاری طلا)" }];

  pcbType = [{ title: "تک لایه" }, { title: "دو لایه متالیزه" }, { title: "چند لایه" }];

  protectiveColor = [{ title: "سبز" }, { title: "سفید" }, { title: "مشکی" }, { title: "قرمز" }, { title: "آبی" }];

  partsPrinting = [{ title: " ندارد" }, { title: " یک رو " }, { title: " دو رو" }];

  celeryPrint = [{ title: " ندارد" }, { title: " یک رو " }, { title: " دو رو" }];

  partsColor = [{ title: " سفید" }, { title: " مشکی " }];

  eTest = [{ title: 'خیر' }, { title: 'بله' }];

  carbonPrinting = [{ title: 'خیر' }, { title: 'بله' }];

  finalCutList = "";
  constructor(
    private router: Router,
    private service: UserService,
    private token: TokenService,
    private ref: DynamicDialogRef,
    private localStorage: LocalStorageService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      userID: new FormControl(this.localStorage.userID),
      title: new FormControl(null),
      number: new FormControl(null),
      pcbType: new FormControl(null),
      material: new FormControl(null),
      copperThickness: new FormControl(null),
      celeryPrint: new FormControl(null),
      cover: new FormControl(null),
      protectiveColor: new FormControl(null),
      partsPrinting: new FormControl(null),
      dimensionsBoardX: new FormControl(null),
      dimensionsBoardY: new FormControl(null),
      pcbThickness: new FormControl(null),
      eTest: new FormControl(null),
      carbonPrinting: new FormControl(null),
      finalCut: new FormControl(null),
      partsColor: new FormControl(null),
      description: new FormControl(null),
      files: new FormControl(null),
    });
  }

  submitForm(): void {
    this.service.addOrder(this.localStorage.userToken, this.form.value).subscribe((response: any) => {
      if (response.success === true) {
        this.sendSms(response.data.code);
        this.ref.close(true);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'خطا در ثبت اطلاعات',
        });
      }
    });
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

  onCheck(event: any) {
    for (let i = 0; i < event.checked.length; i++) {
      this.finalCutList += event.checked[i].name + ",";
    }
    this.form.controls.finalCut.setValue(this.finalCutList);
  }

  onFileUpload(event: any): void {
    const formData = new FormData();
    for (let i = 0; i < event.files.length; i++) {
      formData.append('files', event.files[i], event.files[i].name);
    }    
    this.service.multiUpload(formData).subscribe((response: any) => {
      if (response.success === true) {
        this.form.controls.files.setValue(response.data);
        this.messageService.add({
          severity: 'success',
          summary: 'با موفقیت آپلود شد.',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'خطا در آپلود فایل',
        });
      }
    });
  }


}
