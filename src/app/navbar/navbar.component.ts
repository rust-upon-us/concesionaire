import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  AfterViewInit,
  Output,
  ViewChild,
} from '@angular/core';
import { faMoon, faSun, faCogs } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('navbar', { read: ElementRef, static: false }) navbar: ElementRef;
  @Output() navbarEvent = new EventEmitter<number>();

  brandName: String = 'Proyecto';
  darkMode: Boolean = false;
  btnIcon = faMoon;
  linkIcon = faCogs;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.navbar) {
      this.navbarEvent.emit(this.navbar.nativeElement.offsetHeight);
    }
  }

  changeMode() {
    this.darkMode = !this.darkMode;

    if (this.darkMode) {
      this.btnIcon = faSun;
    } else {
      this.btnIcon = faMoon;
    }
  }
}
