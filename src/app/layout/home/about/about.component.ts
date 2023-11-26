import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
@Input()name:string |any;
@Output()test = new EventEmitter<String>();
sendToParent(value:any){
  this.test.emit(value)
}

}
