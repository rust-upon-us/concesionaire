import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Billing } from './../../models/billing.model';
import { BillingService } from './../../services/billing.service';
import { Client } from './../../models/client.model';
import { ClientService } from './../../services/client.service';
import { Financing } from './../../models/financing.model';
import { FinancingService } from './../../services/financing.service';
import { Hardware } from './../../models/hardware.model';
import { HardwareService } from './../../services/hardware.service';
import { News } from './../../models/news.model';
import { NewsService } from './../../services/news.service';
import { Vehicle } from './../../models/vehicle.model';
import { VehicleService } from './../../services/vehicle.service';
import * as Aos from 'aos';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss'],
})
export class DashboardListComponent implements AfterViewInit {
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('main', { read: ElementRef, static: false })
  main: ElementRef;
  @ViewChild('containner', { read: ElementRef, static: false })
  containner: ElementRef;
  @ViewChild('content', { read: ElementRef, static: false })
  content: ElementRef;

  pageHeight = 0;
  elementHeight = 0;
  auxHeight;

  length = 0;
  pageSize = 10;
  pageindex: number = 1;
  pageSizeOptions: number[] = [10, 20];

  isBilling = false;
  billingList: Array<Billing> = [];
  isClient = false;
  clientList: Array<Client> = [];
  isFinancing = false;
  financingList: Array<Financing> = [];
  isHardware = false;
  hardwareList: Array<Hardware> = [];
  isNews = false;
  newsList: Array<News> = [];
  isVehicle = false;
  vehicleList: Array<Vehicle> = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private billingService: BillingService,
    private clientService: ClientService,
    private financingService: FinancingService,
    private hardwareService: HardwareService,
    private newsService: NewsService,
    private vehicleService: VehicleService
  ) {}

  ngOnInit() {
    Aos.init();
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
    this.route.queryParams.subscribe(() => {
      this.getData();
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    /*this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) =>
      !filter || data.name == filter;

    this.dataSource.filter = 'Hydrogen';*/
  }

  getData() {
    if (this.isBilling) {
      this.billingService.getList().subscribe(
        (data) => {
          this.billingList = data;
          this.dataSource = new MatTableDataSource(
            this.billingList.slice(0, this.pageSize)
          );
          this.displayedColumns = [
            'vehicle',
            'client',
            'worker',
            'cost',
            '_id',
          ];
          this.calcHeight(this.dataSource.data.length);
          this.length = this.billingList.length;
        },
        (error) => {
          console.log(error);
        }
      );
    }
    if (this.isClient) {
      this.clientService.getList().subscribe(
        (data) => {
          this.clientList = data;
          this.dataSource = new MatTableDataSource(
            this.clientList.slice(0, this.pageSize)
          );
          this.displayedColumns = ['nif', 'name', 'phone', '_id'];
          this.calcHeight(this.dataSource.data.length);
          this.length = this.clientList.length;
        },
        (error) => {
          console.log(error);
        }
      );
    }
    if (this.isFinancing) {
      this.financingService.getList().subscribe(
        (data) => {
          this.financingList = data;
          this.dataSource = new MatTableDataSource(
            this.financingList.slice(0, this.pageSize)
          );
          this.displayedColumns = [
            'source',
            'effect',
            'release',
            'availability',
            '_id',
          ];
          this.calcHeight(this.dataSource.data.length);
          this.length = this.financingList.length;
        },
        (error) => {
          console.log(error);
        }
      );
    }
    if (this.isHardware) {
      this.hardwareService.getList().subscribe(
        (data) => {
          this.hardwareList = data;
          this.dataSource = new MatTableDataSource(
            this.hardwareList.slice(0, this.pageSize)
          );
          this.displayedColumns = [
            'name',
            'functionality',
            'description',
            '_id',
          ];
          this.calcHeight(this.dataSource.data.length);
          this.length = this.hardwareList.length;
        },
        (error) => {
          console.log(error);
        }
      );
    }
    if (this.isNews) {
      this.newsService.getListHome().subscribe(
        (data) => {
          this.newsList = data;
          this.dataSource = new MatTableDataSource(
            this.newsList.slice(0, this.pageSize)
          );
          this.displayedColumns = ['title', 'type', 'link', 'image', '_id'];
          this.calcHeight(this.dataSource.data.length);
          this.length = this.newsList.length;
        },
        (error) => {
          console.log(error);
        }
      );
    }
    if (this.isVehicle) {
      this.vehicleService.getList().subscribe(
        (data) => {
          this.vehicleList = data;
          this.dataSource = new MatTableDataSource(
            this.vehicleList.slice(0, this.pageSize)
          );
          this.displayedColumns = [
            'model',
            'registration',
            'mileage',
            'type',
            '_id',
          ];
          this.calcHeight(this.dataSource.data.length);
          this.length = this.vehicleList.length;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  deleteElement(id: string) {
    if (this.isBilling) {
      this.billingService.delete(id).subscribe(
        (data) => {
          this.ngOnInit();
        },
        (error) => {
          console.log(error);
        }
      );
    }
    if (this.isClient) {
      this.clientService.delete(id).subscribe(
        (data) => {
          this.ngOnInit();
        },
        (error) => {
          console.log(error);
        }
      );
    }
    if (this.isFinancing) {
      this.financingService.delete(id).subscribe(
        (data) => {
          this.ngOnInit();
        },
        (error) => {
          console.log(error);
        }
      );
    }
    if (this.isHardware) {
      this.hardwareService.delete(id).subscribe(
        (data) => {
          this.ngOnInit();
        },
        (error) => {
          console.log(error);
        }
      );
    }
    if (this.isNews) {
      this.newsService.delete(id).subscribe(
        (data) => {
          this.ngOnInit();
        },
        (error) => {
          console.log(error);
        }
      );
    }
    if (this.isVehicle) {
      this.vehicleService.delete(id).subscribe(
        (data) => {
          this.ngOnInit();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  pagination(event: any) {
    this.pageindex = event.pageIndex;
    this.pageSize = event.pageSize;

    let start = this.pageindex * this.pageSize;
    let end = this.pageindex * this.pageSize + this.pageSize;

    if (this.isBilling) {
      this.dataSource = new MatTableDataSource(
        this.billingList.slice(start, end)
      );
    }
    if (this.isClient) {
      this.dataSource = new MatTableDataSource(
        this.clientList.slice(start, end)
      );
    }
    if (this.isFinancing) {
      this.dataSource = new MatTableDataSource(
        this.financingList.slice(start, end)
      );
    }
    if (this.isHardware) {
      this.dataSource = new MatTableDataSource(
        this.hardwareList.slice(start, end)
      );
    }
    if (this.isNews) {
      this.dataSource = new MatTableDataSource(
        this.newsList.slice(start, end)
      );
    }
    if (this.isVehicle) {
      this.dataSource = new MatTableDataSource(
        this.vehicleList.slice(start, end)
      );
    }
  }

  calcHeight(elements: number) {
    if (this.main) {
      this.pageHeight = this.main.nativeElement.offsetHeight;
    }
    if (this.containner) {
      this.elementHeight = this.containner.nativeElement.offsetHeight;
    }
    this.auxHeight =
      ((this.pageHeight - this.elementHeight) / 10) * (10 - elements);
    this.content.nativeElement.style = 'height: ' + this.auxHeight + 'px ';
  }
}
