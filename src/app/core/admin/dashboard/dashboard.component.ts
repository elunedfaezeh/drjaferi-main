import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/auth/local-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  
  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
  ) {}
  logOut() {
    this.localStorage.removeCurrentUser();
    this.router.navigateByUrl('/auth');
  }

}
