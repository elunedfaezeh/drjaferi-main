import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/auth/token.service';
import { AdminService } from '../../admin.service';
import { LocalStorageService } from 'src/app/auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss'],
  providers: [MessageService]
})
export class EditOrderComponent {
  form: FormGroup | any;

  errorMessages = {
    title: [{ type: 'required', message: ' عنوان را وارد کنید.' }],
  };

  status = [
    { title: 'تایید' },
    { title: 'در حال بررسی' },
    { title: 'در حال آماده سازی' },
    { title: 'آماده برای ارسال' },
    { title: 'ارسال شد' },
    { title: 'تحویل داده شد' },
    { title: 'عدم پذیرش' },
  ];

  finalCut = [
    { name: 'Punch' },
    { name: 'V-Cut' },
    { name: 'CNC' },
  ];

  carbonPrinting = [{title: 'خیر' }, {title: 'بله' }];

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

  eTest = [ { title: " خیر " },{ title: " بله" }];

  finalCutList = "";

  users: any[] = [];

  order: any;

  constructor(
    private service: AdminService,
    private token: TokenService,
    private ref: DynamicDialogRef,
    private localStorage: LocalStorageService,
    private messageService: MessageService,
    public config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.order = this.config.data.order;
    this.getUsers();
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      status: new FormControl(this.order.status),
      userID: new FormControl(this.order.userID),
      title: new FormControl(this.order.title),
      number: new FormControl(this.order.number),
      pcbType: new FormControl(this.order.pcbType),
      material: new FormControl(this.order.material),
      copperThickness: new FormControl(this.order.copperThickness),
      celeryPrint: new FormControl(this.order.celeryPrint),
      cover: new FormControl(this.order.cover),
      protectiveColor: new FormControl(this.order.protectiveColor),
      partsPrinting: new FormControl(this.order.partsPrinting),
      dimensionsBoardX: new FormControl(this.order.dimensionsBoardX),
      dimensionsBoardY: new FormControl(this.order.dimensionsBoardY),
      pcbThickness: new FormControl(this.order.pcbThickness),
      eTest: new FormControl(this.order.eTest),
      carbonPrinting: new FormControl(this.order.carbonPrinting),
      finalCut: new FormControl(this.order.finalCut),
      partsColor: new FormControl(this.order.partsColor),
      description: new FormControl(this.order.description),
      files: new FormControl(this.order.files),
    });
  }

  getUsers(): any {
    this.service.getUsers(this.localStorage.userToken).subscribe((response: any) => {
      if (response.success === true) {
        this.users = response.data;
      } else {
        this.token.checkTokenExamination(response.data, 'admin');
      }
    });
  }
  submitForm(): void {
    this.service.editOrder(this.localStorage.userToken, this.order._id, this.form.value).subscribe((response: any) => {
      if (response.success === true) {
        this.ref.close(true);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'خطا در ثبت اطلاعات',
        });
      }
    });
  }

  onCheck(event: any) {
    for (let i = 0; i < event.checked.length; i++) {
      this.finalCutList += event.checked[i].name + ",";
    }
    this.form.controls.finalCut.setValue(this.finalCutList);
  }

  onFileUpload(event: any) {
    const formData = new FormData();
    for (let i = 0; i < event.files.length; i++) {
      formData.append('files', event.files[i], event.files[i].name);
    }

    console.log(formData);

    this.service.multiUpload(formData).subscribe((response: any) => {
      if (response.success === true) {
        this.form.controls.file.setValue(response.data);
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

