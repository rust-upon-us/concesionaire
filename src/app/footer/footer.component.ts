import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  @ViewChild('footer', { read: ElementRef, static: false }) footer: ElementRef;
  @Output() footerEvent = new EventEmitter<number>();

  linkedin = faLinkedin;
  twitter = faTwitter;
  github = faGithub;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.footer) {
      this.footerEvent.emit(this.footer.nativeElement.offsetHeight);
    }
  }
}
