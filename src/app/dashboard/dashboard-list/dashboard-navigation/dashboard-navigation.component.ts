import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-navigation',
  templateUrl: './dashboard-navigation.component.html',
  styleUrls: ['./dashboard-navigation.component.scss'],
})
export class DashboardNavigationComponent implements OnInit {
  isBilling = false;
  isClient = false;
  isFinancing = false;
  isHardware = false;
  isNews = false;
  isVehicle = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(() => {
      if (this.router.url === '/dashboard/billing') {
        this.isBilling = true;
      } else {
        this.isBilling = false;
      }
      if (this.router.url === '/dashboard/client') {
        this.isClient = true;
      } else {
        this.isClient = false;
      }
      if (this.router.url === '/dashboard/financing') {
        this.isFinancing = true;
      } else {
        this.isFinancing = false;
      }
      if (this.router.url === '/dashboard/hardware') {
        this.isHardware = true;
      } else {
        this.isHardware = false;
      }
      if (this.router.url === '/dashboard/news') {
        this.isNews = true;
      } else {
        this.isNews = false;
      }
      if (this.router.url === '/dashboard/vehicle') {
        this.isVehicle = true;
      } else {
        this.isVehicle = false;
      }
    });
  }
}
