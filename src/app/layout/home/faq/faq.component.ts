import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../layout.service';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  faqs: any[] = []
  constructor(private service: LayoutService) { }

  ngOnInit(): void {
    this.getFaqs();
  }

  getFaqs() {
    this.service.getFaqs()
      .subscribe((response: any) => {
        if (response.success === true) {
          this.faqs = response.data;
        } else {
          // this.messageService.add({
          //   severity: 'error',
          //   summary: ''
          // })
        }
      });
  }

}
