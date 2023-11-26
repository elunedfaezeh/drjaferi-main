import { TokenService } from './../../../auth/token.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { LayoutService } from '../../layout.service';
import { Component, OnInit } from '@angular/core';
import * as moment_ from 'jalali-moment'; const moment = moment_; 

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class GalleryComponent implements OnInit {
  images: any[] = [];
  item: any[] = [];
  responsiveOptions: any[] | any;
  constructor(
    private messageService: MessageService,
    private service: LayoutService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private confirmationService: ConfirmationService
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 4,
        numScroll: 4,
      },
      {
        breakpoint: '992px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];

  }
  // var d = new Date(date);
  //return d.toLocaleDateString('fa', { weekday: 'long' });



  getDayName() {
    let day = parseInt(moment().locale('fa').format('d'));
    switch (day) {
      case 0:
        return "یکشنبه";
      case 1:
        return "دوشنبه";
      case 2:
        return "سه شنبه";
      case 3:
        return "چهارشنبه";
      case 4:
        return "پنجشنبه";
      case 5:
        return "جمعه";
      case 6:
        return "شنبه";
      default:
        return "err";
    }

  }
  ngOnInit(): void {
    var date = new Date(Date.now());
    var day = date.getDay();
    var time = date.getTime();
    // let date = moment().locale('fa').format('YYYY-MM-DD');
    // let day = this.getDayName();
    // let time = moment().locale('fa').format('HH:MM');
    console.log(date, "|", day, "|", time);

    this.images = [
      { Image: "../../../../assets/images/1.jpg" },
      { Image: "../../../../assets/images/2.jpg" },
      { Image: "../../../../assets/images/3.jpg" },
      { Image: "../../../../assets/images/4.jpg" },
      { Image: "../../../../assets/images/5.jpg" },];

    this.getGallery();
  }

  getGallery() {
    this.service.getGallery().subscribe((response: any) => {
      if (response.success === true) {
        this.images = response.data;
        console.log(this.images);
        
      } else {
        this.token.checkTokenExamination(response.data, 'admin');
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت اطلاعات ',
          detail: response.data,
        });
      }
    });
  }

}

