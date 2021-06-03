import { Component, OnInit } from '@angular/core';
import { News } from './../models/news.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NewsService } from './../services/news.service';
import * as Aos from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  message =
    'Somos una empresa dedicada a la venta de vehiculos en la que ofrecemos a los usuarios que buscan vehiculos un completo catálogo de vehiculos para facilitar encontrar aquello que andan buscando actuamos por tanto como un lugar de referencia para los usuarios que buscan un nuevo coche como para los profesionales que buscan incrementar capacidades de negocio';

  imgBuilding = 'url(../../assets/images/landing-building.jpg)';
  imgField = 'url(../../assets/images/landing-field.jpg)';
  imgVehicle = 'url(../../assets/images/landing-vehicle.jpg)';
  img = 'url(../../assets/images/landing-cover.png)';

  newsCard: Array<News> = [];
  newsCarousel: Array<News> = [];

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) {}

  ngOnInit() {
    Aos.init();
    this.route.queryParams.subscribe(() => {
      this.getData();
    });
  }

  getData() {
    this.newsService.getListHome().subscribe(
      (data) => {
        let news = data;
        this.newsCard = news.filter((record) => record.type === 'card');
        this.newsCarousel = news.filter((record) => record.type === 'carousel');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
