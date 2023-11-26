import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import { LocalStorageService } from './../../../auth/local-storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  display = false;
  currentUser: boolean = false;
  type:any;
  constructor(
    private viewportScroller: ViewportScroller,
    private localStorage: LocalStorageService,
    private router: Router) {
    this.items = [
      {
        label: 'صفحه اصلی',
        icon: 'pi pi-pw pi-home',
        command: event => this.onClick('hero')
      },

      {
        label: 'تماس با ما',
        icon: 'pi pi-fw pi-phone',
        command: event => this.onClick('contact')
      },
      {
        label: 'سوالات متداول',
        icon: 'pi pi-fw pi-question',
        command: event => this.onClick('faq')
      },
      {
        label: 'گالری',
        icon: 'pi pi-fw pi-images',
        command: event => this.onClick('gallery')
      },
      {
        label: 'ورود',
        icon: 'pi pi-fw pi pi-user',
        command: (event) => this.router.navigate(['/auth'])
      },
    ];
  }


  ngOnInit(): void {
    this.currentUser = this.localStorage.getCurrentUser();
    this.type=this.localStorage.userType;
    var pc = window.document.getElementById('scroll')!;
    var pcSticky = 0;
    if (pc !== null) {
      pcSticky = pc.offsetTop;
    }

    window.addEventListener('scroll', scroll, true);

    function scroll() {
      if (pc !== undefined) {
        if (window.pageYOffset > pcSticky) {
          pc.classList.add('sticky');
        } else {
          pc.classList.remove('sticky');
        }
      }
    }

  }

  showMenu(): void {
    this.display = true;
  }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);

    if (this.display === true) {
      this.display = false;
    }
  }

}
