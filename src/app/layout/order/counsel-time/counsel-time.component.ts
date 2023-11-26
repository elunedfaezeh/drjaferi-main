import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-counsel-time',
  templateUrl: './counsel-time.component.html',
  styleUrls: ['./counsel-time.component.scss']
})
export class CounselTimeComponent implements OnInit {

  form!: FormGroup;
  categories: any[] = [
    { name: 'ساعت: 10-12', key: 'A' },
    { name: 'ساعت: 10-12', key: 'M' },
    { name: 'ساعت: 10-12', key: 'P' },
    { name: 'ساعت: 10-12', key: 'R' }
];
constructor(
  private router: Router,
  private messageService: MessageService,
) { }

ngOnInit() {
  this.form = new FormGroup({
      time: new FormControl(null)
  });
}

submitForm(){
  if(this.form.controls['time'].value==null){
    this.messageService.add({
            severity: 'error',
            summary: 'ساعت مشاوره را انتخاب کنید',
          });
  }
  else{
  this.router.navigateByUrl('/order/userinfo');
 } 
}
}

