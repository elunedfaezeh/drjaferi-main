import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/auth/local-storage.service';
import { AdminService } from './admin.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  items: MenuItem[];
  display = true;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  image: any;
  fullName: any;

  constructor(
    private localStorage: LocalStorageService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private service: AdminService
  ) {
    this.items = [
      {
        label: 'داشبورد',
        icon: 'pi pi-home',
        routerLink: '/admin/panel',
      },
      {
        label: 'وقت های رزرو شده',
        icon: 'pi pi-clock',
        routerLink: '/admin/orders',
      },
      {
        label: ' مدیریت پرداخت ',
        icon: 'pi pi-dollar',
        routerLink: '',
      },
      {
        label: 'کاربران',
        icon: 'pi pi-users',
        routerLink: '/admin/users',
      },
      {
        label: 'مدیریت پیام ها',
        icon: 'pi pi-envelope',
        routerLink: '/admin/contact',
      },
      {
        label: 'سوالات متداول',
        icon: 'pi pi-question-circle',
        routerLink: '/admin/faqs',
      },
      {
        label: 'گالری',
        icon: 'pi pi-fw pi-images',
        routerLink: '/admin/gallery',
      },
  
    ];
  }


  ngOnInit(): void {
    if (!this.localStorage.getCurrentUser() || this.localStorage.userType != 'admin') {
      this.router.navigateByUrl('/admin');
    } 
    this.image=this.localStorage.userImage;
    this.fullName=this.localStorage.userFullName;

  }

  logOut() {
    this.localStorage.removeCurrentUser();
    this.router.navigateByUrl('/admin');
  }



}
