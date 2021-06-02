import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';
import {
  faCarSide,
  faShuttleVan,
  faMotorcycle,
  faTruckPickup,
  faTruck,
  faTractor,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-products-branch',
  templateUrl: './products-branch.component.html',
  styleUrls: ['./products-branch.component.scss'],
})
export class ProductsBranchComponent implements OnInit {
  aosDelay = 200;

  //truck-pickup todoterreno
  //motorcycle motocicletas
  //tractor vehiculos agrarios
  //truck reparto
  //car-side Automovil
  //shuttle-van Monovolumen / familiar

  branchs = [
    {
      target: 'Automovil',
      detail: 'Automoviles',
      image: faCarSide,
    },
    {
      target: 'Monovolumen',
      detail: 'Monovolumenes',
      image: faShuttleVan,
    },
    {
      target: 'Motocicletas',
      detail: 'Motocicletas',
      image: faMotorcycle,
    },
    {
      target: 'Todoterreno',
      detail: 'Todoterrenos',
      image: faTruckPickup,
    },
    {
      target: 'Comerciales',
      detail: 'Comerciales',
      image: faTruck,
    },
    {
      target: 'Agrarios',
      detail: 'Agrarios',
      image: faTractor,
    },
  ];

  constructor() {}

  ngOnInit() {
    Aos.init();
  }
}
