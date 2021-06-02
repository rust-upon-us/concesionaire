import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.scss'],
})
export class DashboardNavbarComponent implements OnInit {
  darkMode: Boolean = false;
  icon = faDoorOpen;

  constructor(private router: Router) {}

  ngOnInit() {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
