import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Billing } from 'src/app/models/billing.model';
import { BillingService } from './../../../services/billing.service';
import { Client } from './../../../models/client.model';
import { ClientService } from './../../../services/client.service';
import { Financing } from './../../../models/financing.model';
import { FinancingService } from './../../../services/financing.service';
import { Vehicle } from './../../../models/vehicle.model';
import { VehicleService } from './../../../services/vehicle.service';
import { Worker } from './../../../models/worker.model';
import { WorkerService } from './../../../services/worker.service';

@Component({
  selector: 'app-dashboard-billing',
  templateUrl: './dashboard-billing.component.html',
  styleUrls: ['./dashboard-billing.component.scss'],
})
export class DashboardBillingComponent implements OnInit {
  @Input() id: string;
  isSent: Boolean = false;
  billingForm: FormGroup;
  billingObject: Billing;
  clientList: Array<Client> = [];
  financingList: Array<Financing> = [];
  vehicleList: Array<Vehicle> = [];
  workerList: Array<Worker> = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private billingService: BillingService,
    private clientService: ClientService,
    private financingService: FinancingService,
    private vehicleService: VehicleService,
    private workerService: WorkerService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.id = '';
    this.billingForm = this.formBuilder.group({
      year: [Date, [Validators.required]],
      cost: [Number, [Validators.required, Validators.min(0)]],
      worker: ['', [Validators.required]],
      client: ['', [Validators.required]],
      vehicle: ['', [Validators.required]],
      financing: ['', []],
    });

    this.getDataForms();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params.id;
      if (params.id != 'new') {
        this.getData();
      } else {
        this.getDataForms();
      }
    });
  }

  getData() {
    this.billingService.getItem(this.id).subscribe(
      (data) => {
        this.billingObject = data;
        this.billingForm.setValue({
          year: this.datePipe.transform(this.billingObject.year, 'yyyy-MM-dd'),
          cost: this.billingObject.cost,
          worker: this.billingObject.worker._id,
          client: this.billingObject.client._id,
          vehicle: this.billingObject.vehicle._id,
          financing: this.billingObject.financing._id,
        });
      },
      (error) => {
        console.log(error);
      }
    );
    this.getDataForms();
  }

  getDataForms() {
    this.clientService.getList().subscribe(
      (data) => {
        this.clientList = data;
      },
      (error) => {
        console.log(error);
      }
    );
    this.financingService.getList().subscribe(
      (data) => {
        this.financingList = data;
      },
      (error) => {
        console.log(error);
      }
    );
    this.vehicleService.getList().subscribe(
      (data) => {
        this.vehicleList = data;
      },
      (error) => {
        console.log(error);
      }
    );
    this.workerService.getList().subscribe(
      (data) => {
        this.workerList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get form(): any {
    return this.billingForm.controls;
  }

  onSubmit(): void {
    this.isSent = true;
    // Process checkout data here
    if (!this.billingForm.invalid) {
      if (this.id == 'new') {
        this.billingService.save(this.billingForm.value).subscribe(
          (data) => {
            this.router.navigate(['/dashboard/billing']);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.billingObject.year = this.billingForm.controls.year.value;
        this.billingObject.cost = this.billingForm.controls.cost.value;
        this.billingObject.worker = this.workerList.find(
          (item) => item._id == this.billingForm.controls.worker.value
        );
        this.billingObject.client = this.clientList.find(
          (item) => item._id == this.billingForm.controls.client.value
        );
        this.billingObject.vehicle = this.vehicleList.find(
          (item) => item._id == this.billingForm.controls.vehicle.value
        );
        this.billingObject.financing = this.financingList.find(
          (item) => item._id == this.billingForm.controls.financing.value
        );

        this.billingService.update(this.billingObject).subscribe(
          (data) => {
            this.router.navigate(['/dashboard/billing']);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    } else {
      return;
    }
  }
}
