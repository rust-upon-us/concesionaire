import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('body', { read: ElementRef, static: false }) body: ElementRef;

  title = 'Proyecto';
  navbar: number = 0;
  footer: number = 0;
  isDashboard = false;

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (this.router.url.includes('/dashboard')) {
        this.isDashboard = true;
        if (this.body) {
          this.body.nativeElement.style = `min-height: calc(100vh - ${this.footer}px)`;
        }
      } else {
        this.isDashboard = false;
        if (this.body) {
          this.body.nativeElement.style = `min-height: calc(100vh - calc(${this.navbar}px + ${this.footer}px))`;
        }
      }
    });
  }

  navbarEvent(height: number) {
    this.navbar = height;
  }
  footerEvent(height: number) {
    this.footer = height;
  }
  ngAfterViewInit() {
    if (this.body) {
      this.body.nativeElement.style = `min-height: calc(100vh - calc(${this.navbar}px + ${this.footer}px))`;
    }
  }
}
