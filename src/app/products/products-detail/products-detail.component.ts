import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Vehicle } from './../../models/vehicle.model';
import { VehicleService } from './../../services/vehicle.service';
import * as Aos from 'aos';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss'],
})
export class ProductsDetailComponent implements OnInit {
  @Output() productEvent = new EventEmitter<boolean>();

  id = '';
  product: Vehicle = {
    _id: '01234',
    brand: 'wolkswagen',
    model: 'pasat',
    cost: 13845,
    frame: 'awdawd1a9d84a1d64aw8461wa48',
    mileage: 77908,
    registration: 'cu1547',
    images: [
      'url(https://img-eu-c1.autohero.com/img/ddb8d5fc14a3b7a29fb65b58e65dcf21a296b8b3cdf49658c38cc0ffaecbcd9e/exterior/1/768x432-9a878f1bea8d4a74a2c304e6d8b9a913.jpg)',
      'url(https://img-eu-c1.autohero.com/img/ddb8d5fc14a3b7a29fb65b58e65dcf21a296b8b3cdf49658c38cc0ffaecbcd9e/exterior/1/768x432-9a878f1bea8d4a74a2c304e6d8b9a913.jpg)',
      'url(https://img-eu-c1.autohero.com/img/ddb8d5fc14a3b7a29fb65b58e65dcf21a296b8b3cdf49658c38cc0ffaecbcd9e/exterior/1/768x432-9a878f1bea8d4a74a2c304e6d8b9a913.jpg)',
      'url(https://img-eu-c1.autohero.com/img/ddb8d5fc14a3b7a29fb65b58e65dcf21a296b8b3cdf49658c38cc0ffaecbcd9e/exterior/1/768x432-9a878f1bea8d4a74a2c304e6d8b9a913.jpg)',
    ],
    year: 2017,
    itv: new Date(Date.now()),
    type: 'automovil',
    doors: 4,
    color: '#c3c3c3',
    displacement: '135',
    gearbox: 'manual',
    fuel: 'Diesel',
    gasEmision: '158',
    financing: [
      {
        _id: '1231',
        source: 'Gobierno de españa',
        effect: 21,
        description: 'Descuento de iva',
        release: new Date(Date.now()),
        availability: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    ],
    hardware: [
      {
        _id: '1231141',
        name: 'Elevalunas eléctricos',
        description: 'Elevalunas eléctricos',
        functionality: 'Confort',
      },
      {
        _id: '12314341',
        name: 'Ordenador de a bordo',
        description: 'sistema de navegacion para mejorar viajes',
        functionality: 'Multimedia',
      },
      {
        _id: '12314341',
        name: 'Reproductor Bluetooth',
        description: 'Reproductor Bluetooth',
        functionality: 'Multimedia',
      },
      {
        _id: '1213',
        name: 'Luces antiniebla',
        description: '',
        functionality: 'Luz y vista',
      },
      {
        _id: '52324',
        name: 'Sistema antibloqueo (ABS)',
        description: 'bloqueo de ruedas',
        functionality: 'Seguridad',
      },
      {
        _id: '7341',
        name: 'Barras portaequipajes en el techo',
        description: '',
        functionality: 'Otros',
      },
    ],
  };
  hardware = [];
  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService
  ) {}

  ngOnInit() {
    Aos.init();
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.getData();
    });
    this.productEvent.emit(true);
  }

  getData() {
    this.vehicleService.getItemProduct(this.id).subscribe(
      (data) => {
        this.product = data;
        this.hardware = [];
        let functionalitys = this.product.hardware
          .map((item) => item.functionality)
          .filter((value, index, self) => self.indexOf(value) === index);
        functionalitys.forEach((functionality) => {
          let array = this.product.hardware.filter(
            (record) => record.functionality === functionality
          );
          this.hardware.push(array);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
