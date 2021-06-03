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
  delay = 200;

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
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.calcHeight();
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
          this.calcDelay();
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
          this.calcDelay();
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
          this.calcDelay();
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
          this.calcDelay();
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
          this.calcDelay();
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
          this.calcDelay();
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
      this.dataSource = new MatTableDataSource(this.newsList.slice(start, end));
    }
    if (this.isVehicle) {
      this.dataSource = new MatTableDataSource(
        this.vehicleList.slice(start, end)
      );
    }
  }

  sortChange(event) {
    console.log(event);

    let active = event.active;
    let order = event.direction;
    let start = this.paginator.pageIndex * this.paginator.pageSize;
    let end = start + this.paginator.pageSize;

    if (this.isBilling) {
      if (order == '') {
        this.billingList.sort((a, b) => a._id.localeCompare(b._id));
      } else {
        if (active == 'vehicle') {
          this.billingList = this.billingList.sort((a, b) =>
            (a.vehicle.brand + '' + a.vehicle.model).localeCompare(
              b.vehicle.brand + '' + b.vehicle.model
            )
          );
        }
        if (active == 'client') {
          this.billingList = this.billingList.sort((a, b) =>
            a.client.nif.localeCompare(b.client.nif)
          );
        }
        if (active == 'worker') {
          this.billingList = this.billingList.sort((a, b) =>
            (a.worker.name + ' ' + a.worker.surname).localeCompare(
              b.worker.name + ' ' + b.worker.surname
            )
          );
        }
        if (active == 'cost') {
          this.billingList = this.billingList.sort((a, b) => {
            return a.cost - b.cost;
          });
        }
        if (order == 'desc') {
          this.billingList = this.billingList.reverse();
        }
      }
      this.dataSource = new MatTableDataSource(
        this.billingList.slice(start, end)
      );
    }
    if (this.isClient) {
      if (order == '') {
        this.clientList.sort((a, b) => a._id.localeCompare(b._id));
      } else {
        if (active == 'nif') {
          this.clientList = this.clientList.sort((a, b) =>
            a.nif.localeCompare(b.nif)
          );
        }
        if (active == 'name') {
          this.clientList = this.clientList.sort((a, b) =>
            (a.name + '' + a.surname).localeCompare(b.name + '' + b.surname)
          );
        }
        if (active == 'phone') {
          this.clientList = this.clientList.sort((a, b) =>
            (a.phonePrefix + '' + a.phone).localeCompare(
              b.phonePrefix + '' + b.phone
            )
          );
        }
        if (order == 'desc') {
          this.clientList = this.clientList.reverse();
        }
      }
      this.dataSource = new MatTableDataSource(
        this.clientList.slice(start, end)
      );
    }
    if (this.isFinancing) {
      if (order == '') {
        this.financingList.sort((a, b) => a._id.localeCompare(b._id));
      } else {
        if (active == 'source') {
          this.financingList = this.financingList.sort((a, b) =>
            a.source.localeCompare(b.source)
          );
        }
        if (active == 'effect') {
          this.financingList = this.financingList.sort((a, b) => {
            return a.effect - b.effect;
          });
        }
        if (active == 'release') {
          this.financingList = this.financingList.sort((a, b) => {
            return <any>new Date(a.release) - <any>new Date(b.release);
          });
        }
        if (active == 'availability') {
          this.financingList = this.financingList.sort((a, b) => {
            return (
              <any>new Date(a.availability) - <any>new Date(b.availability)
            );
          });
        }
        if (order == 'desc') {
          this.financingList = this.financingList.reverse();
        }
      }
      this.dataSource = new MatTableDataSource(
        this.financingList.slice(start, end)
      );
    }
    if (this.isHardware) {
      if (order == '') {
        this.hardwareList.sort((a, b) => a._id.localeCompare(b._id));
      } else {
        if (active == 'name') {
          this.hardwareList = this.hardwareList.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
        }
        if (active == 'functionality') {
          this.hardwareList = this.hardwareList.sort((a, b) =>
            a.functionality.localeCompare(b.functionality)
          );
        }
        if (active == 'description') {
          this.hardwareList = this.hardwareList.sort((a, b) =>
            a.description.localeCompare(b.description)
          );
        }
        if (order == 'desc') {
          this.hardwareList = this.hardwareList.reverse();
        }
      }
      this.dataSource = new MatTableDataSource(
        this.hardwareList.slice(start, end)
      );
    }
    if (this.isNews) {
      if (order == '') {
        this.newsList.sort((a, b) => a._id.localeCompare(b._id));
      } else {
        if (active == 'title') {
          this.newsList = this.newsList.sort((a, b) =>
            a.title.localeCompare(b.title)
          );
        }
        if (active == 'type') {
          this.newsList = this.newsList.sort((a, b) =>
            a.type.localeCompare(b.type)
          );
        }
        if (active == 'link') {
          this.newsList = this.newsList.sort((a, b) =>
            a.link.localeCompare(b.link)
          );
        }
        if (order == 'desc') {
          this.newsList = this.newsList.reverse();
        }
      }
      this.dataSource = new MatTableDataSource(this.newsList.slice(start, end));
    }
    if (this.isVehicle) {
      if (order == '') {
        this.vehicleList.sort((a, b) => a._id.localeCompare(b._id));
      } else {
        if (active == 'model') {
          this.vehicleList = this.vehicleList.sort((a, b) =>
            (a.brand + '' + a.model).localeCompare(b.brand + '' + b.model)
          );
        }
        if (active == 'registration') {
          this.vehicleList = this.vehicleList.sort((a, b) =>
            a.registration.localeCompare(b.registration)
          );
        }
        if (active == 'mileage') {
          this.vehicleList = this.vehicleList.sort((a, b) => {
            return a.mileage - b.mileage;
          });
        }
        if (active == 'type') {
          this.vehicleList = this.vehicleList.sort((a, b) =>
            a.type.localeCompare(b.type)
          );
        }
        if (order == 'desc') {
          this.vehicleList = this.vehicleList.reverse();
        }
      }
      this.dataSource = new MatTableDataSource(
        this.vehicleList.slice(start, end)
      );
    }
  }

  calcHeight(elements: number = 0) {
    if (this.main) {
      this.pageHeight = this.main.nativeElement.offsetHeight;
    }
    if (this.containner) {
      this.elementHeight = this.containner.nativeElement.offsetHeight;
    }
    this.auxHeight =
      ((this.pageHeight - this.elementHeight) / 14) * (10 - elements);
    console.log(
      this.pageHeight + ' ' + this.elementHeight + ' ' + this.auxHeight
    );
    if (this.content) {
      this.content.nativeElement.style =
        'height: ' + this.auxHeight + 'px ';
    }
  }

  calcDelay() {
    this.delay = 200 + (this.length / 10) * 200;
    Aos.init();
  }
}
