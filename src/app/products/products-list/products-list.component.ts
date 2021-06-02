import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Vehicle } from './../../models/vehicle.model';
import { VehicleService } from './../../services/vehicle.service';
import * as Aos from 'aos';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  products: Array<Vehicle> = [];
  filters = {};

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService
  ) {}

  ngOnInit() {
    Aos.init();
    this.route.queryParams.subscribe((params) => {
      if (this.router.url === '/productos/Automovil') {
        this.filters['branch'] = "Automovil";
      }
      if (this.router.url === '/productos/Monovolumen') {
        this.filters['branch'] = "Monovolumen";
      }
      if (this.router.url === '/productos/Motocicletas') {
        this.filters['branch'] = "Motocicletas";
      }
      if (this.router.url === '/productos/Todoterreno') {
        this.filters['branch'] = "Todoterreno";
      }
      if (this.router.url === '/productos/Comerciales') {
        this.filters['branch'] = "Comerciales";
      }
      if (this.router.url === '/productos/Agrarios') {
        this.filters['branch'] = "Agrarios";
      }
      if (!(params.brand === undefined)) {
        this.filters['brand'] = params.brand;
      }
      if (!(params.model === undefined)) {
        this.filters['model'] = params.model;
      }
      if (!(params.costMin === undefined)) {
        this.filters['costMin'] = params.costMin;
      }
      if (!(params.costMax === undefined)) {
        this.filters['costMax'] = params.costMax;
      }
      this.getData();
    });
  }
  getData() {
    this.vehicleService.getListProduct(this.filters).subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  productNavigation(id: string) {
    this.router.navigate(['/productos/producto/' + id]);
  }
}
