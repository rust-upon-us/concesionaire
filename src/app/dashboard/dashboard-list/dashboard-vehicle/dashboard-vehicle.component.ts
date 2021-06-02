import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from './../../../models/vehicle.model';
import { VehicleService } from './../../../services/vehicle.service';
import { Hardware } from './../../../models/hardware.model';
import { HardwareService } from './../../../services/hardware.service';
import { Financing } from './../../../models/financing.model';
import { FinancingService } from './../../../services/financing.service';
import { DatePipe } from '@angular/common';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import * as Aos from 'aos';

@Component({
  selector: 'app-dashboard-vehicle',
  templateUrl: './dashboard-vehicle.component.html',
  styleUrls: ['./dashboard-vehicle.component.scss'],
})
export class DashboardVehicleComponent implements OnInit {
  @Input() id: string;
  faPlus = faPlus;
  isSent: Boolean = false;
  vehicleForm: FormGroup;
  vehicleObject: Vehicle;
  imageList: Array<string> = [];
  hardwareList: Array<Hardware> = [];
  hardwareSelected: Array<Hardware> = [];
  financingList: Array<Financing> = [];
  financingSelected: Array<Financing> = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private hardwareService: HardwareService,
    private financingService: FinancingService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.vehicleForm = this.formBuilder.group({
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      cost: [Number, [Validators.required]],
      frame: ['', [Validators.required]],
      mileage: ['', [Validators.required]],
      registration: [''],
      images: [''],
      year: [Number],
      itv: [Date],
      type: [''],
      doors: [Number],
      color: [''],
      displacement: [''],
      gearbox: [''],
      fuel: [''],
      gasEmision: [''],
      financing: [''],
      hardware: [''],
    });
    this.getDataForms();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params.id;
      if (params.id != 'new') {
        this.getData();
      }
    });
    Aos.init();
  }

  get form(): any {
    return this.vehicleForm.controls;
  }

  getData() {
    this.vehicleService.getItem(this.id).subscribe(
      (data) => {
        this.vehicleObject = data;
        this.vehicleForm.setValue({
          brand: this.vehicleObject.brand,
          model: this.vehicleObject.model,
          cost: this.vehicleObject.cost,
          frame: this.vehicleObject.frame,
          mileage: this.vehicleObject.mileage,
          registration: this.vehicleObject.registration + '',
          year: this.vehicleObject.year + '',
          itv: this.datePipe.transform(this.vehicleObject.itv, 'yyyy-MM-dd'),
          type: this.vehicleObject.type + '',
          images: '',
          doors: this.vehicleObject.doors + '',
          color: this.vehicleObject.color + '',
          displacement: this.vehicleObject.displacement + '',
          gearbox: this.vehicleObject.gearbox + '',
          fuel: this.vehicleObject.fuel + '',
          gasEmision: this.vehicleObject.gasEmision + '',
          financing: '',
          hardware: '',
        });
        this.hardwareSelected = this.vehicleObject.hardware;
        this.financingSelected = this.vehicleObject.financing;
        this.imageList = this.vehicleObject.images;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getDataForms() {
    this.hardwareService.getList().subscribe(
      (data) => {
        this.hardwareList = data;
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
  }

  onSubmit(): void {
    this.isSent = true;
    // Process checkout data here
    if (!this.vehicleForm.invalid) {
      if (this.id == 'new') {
        let result = this.vehicleForm.value;
        result.images = this.imageList;
        result.Hardware = this.hardwareSelected;
        result.financing = this.financingSelected;
        this.vehicleService.save(result).subscribe(
          (data) => {
            this.router.navigate(['/dashboard/vehicle']);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.vehicleObject.brand = this.vehicleForm.controls.brand.value;
        this.vehicleObject.model = this.vehicleForm.controls.model.value;
        this.vehicleObject.cost = this.vehicleForm.controls.cost.value;
        this.vehicleObject.frame = this.vehicleForm.controls.frame.value;
        this.vehicleObject.mileage = this.vehicleForm.controls.mileage.value;
        this.vehicleObject.registration =
          this.vehicleForm.controls.registration.value;
        this.vehicleObject.images = this.imageList;
        this.vehicleObject.year = this.vehicleForm.controls.year.value;
        this.vehicleObject.itv = this.vehicleForm.controls.itv.value;
        this.vehicleObject.type = this.vehicleForm.controls.type.value;
        this.vehicleObject.doors = this.vehicleForm.controls.doors.value;
        this.vehicleObject.color = this.vehicleForm.controls.color.value;
        this.vehicleObject.displacement =
          this.vehicleForm.controls.displacement.value;
        this.vehicleObject.gearbox = this.vehicleForm.controls.gearbox.value;
        this.vehicleObject.fuel = this.vehicleForm.controls.fuel.value;
        this.vehicleObject.gasEmision =
          this.vehicleForm.controls.gasEmision.value;
        this.vehicleObject.financing = this.financingSelected;
        this.vehicleObject.hardware = this.hardwareSelected;

        this.vehicleService.update(this.vehicleObject).subscribe(
          (data) => {
            this.router.navigate(['/dashboard/vehicle']);
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
  addImage() {
    if (this.vehicleForm.controls.images.value != '') {
      this.imageList.push(this.vehicleForm.controls.images.value);
      this.vehicleForm.setValue({
        brand: this.vehicleForm.controls.brand.value,
        model: this.vehicleForm.controls.model.value,
        cost: this.vehicleForm.controls.cost.value,
        frame: this.vehicleForm.controls.frame.value,
        mileage: this.vehicleForm.controls.mileage.value,
        registration: this.vehicleForm.controls.registration.value,
        year: this.vehicleForm.controls.year.value,
        itv: this.vehicleForm.controls.itv.value,
        type: this.vehicleForm.controls.type.value,
        images: '',
        doors: this.vehicleForm.controls.doors.value,
        color: this.vehicleForm.controls.color.value,
        displacement: this.vehicleForm.controls.displacement.value,
        gearbox: this.vehicleForm.controls.gearbox.value,
        fuel: this.vehicleForm.controls.fuel.value,
        gasEmision: this.vehicleForm.controls.gasEmision.value,
        financing: '',
        hardware: '',
      });
    }
  }
  removeImage(item: string) {
    this.imageList = this.imageList.filter((image) => image != item);
  }
  selectFinancing(id: any) {
    if (id instanceof Event) {
      id = this.vehicleForm.controls.financing.value;
      if (
        this.financingSelected &&
        !this.financingSelected.find((item) => item._id == id)
      ) {
        this.financingSelected.push(
          this.financingList.find((item) => item._id == id)
        );
      }
    } else {
      if (
        this.financingSelected &&
        this.financingSelected.find((item) => item._id == id)
      ) {
        this.financingSelected = this.financingSelected.filter(
          (item) => item._id != id
        );
      } else {
        this.financingSelected.push(
          this.financingList.find((item) => item._id == id)
        );
      }
    }
  }
  selectHardware(id: any) {
    if (id instanceof Event) {
      id = this.vehicleForm.controls.hardware.value;
      if (
        this.hardwareSelected &&
        !this.hardwareSelected.find((item) => item._id == id)
      ) {
        this.hardwareSelected.push(
          this.hardwareList.find((item) => item._id == id)
        );
      }
    } else {
      if (
        this.hardwareSelected &&
        this.hardwareSelected.find((item) => item._id == id)
      ) {
        this.hardwareSelected = this.hardwareSelected.filter(
          (item) => item._id != id
        );
      } else {
        this.hardwareSelected.push(
          this.hardwareList.find((item) => item._id == id)
        );
      }
    }
  }
}
