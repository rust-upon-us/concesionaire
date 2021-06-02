import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  isProduct = false;
  @ViewChild('filter', { read: ElementRef, static: false })
  filter: ElementRef;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}

  onActivate(event: any) {
    this.route.params.subscribe((params) => {
      let type = '';
      const route = this.router.routerState.snapshot.url;
      if (route == '/productos/Automovil') {
        type = 'Automovil';
      }
      if (route == '/productos/Monovolumen') {
        type = 'Monovolumen';
      }
      if (route == '/productos/Motocicletas') {
        type = 'Motocicletas';
      }
      if (route == '/productos/Todoterreno') {
        type = 'Todoterreno';
      }
      if (route == '/productos/Comerciales') {
        type = 'Comerciales';
      }
      if (route == '/productos/Agrarios') {
        type = 'Agrarios';
      }
      if (this.filter) {
        this.filter.nativeElement.value = type;
      }
    });
    this.isProduct = event.productEvent ? event.productEvent : false;
  }

  filterProducts(filter: string) {
    if (filter != '') {
      this.router
        .navigateByUrl('/productos', { skipLocationChange: false })
        .then(() => this.router.navigate(['/productos/' + filter]));
    }
  }
}
