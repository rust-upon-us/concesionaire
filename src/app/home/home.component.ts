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
  ipsum =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

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
        this.newsCard = news.filter(record => record.type === "card")
        this.newsCarousel =  news.filter((record) => record.type === "carousel")
      },
      (error) => {
        console.log(error);
      }
    );

  }
}
