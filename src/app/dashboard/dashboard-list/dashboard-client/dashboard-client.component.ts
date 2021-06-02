import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as Aos from 'aos';
import { Client } from './../../../models/client.model';
import { ClientService } from './../../../services/client.service';

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.scss'],
})
export class DashboardClientComponent implements OnInit {
  @Input() id: string;
  isSent: Boolean = false;
  clientForm: FormGroup;
  clientObject: Client;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private formBuilder: FormBuilder
  ) {
    this.clientForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      nif: ['', [Validators.required]],
      phone: [Number, [Validators.required]],
      phonePrefix: [Number, [Validators.required]],
      country: ['', []],
      province: ['', []],
      location: ['', []],
      cp: [Number, []],
      address: ['', []],
    });
    // Password validation number uppercase and lowercase and 6 min chars
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
    return this.clientForm.controls;
  }

  getData() {
    this.clientService.getItem(this.id).subscribe(
      (data) => {
        this.clientObject = data;
        this.clientForm.setValue({
          name: this.clientObject.name,
          surname: this.clientObject.surname,
          nif: this.clientObject.nif,
          phone: this.clientObject.phone,
          phonePrefix: this.clientObject.phonePrefix,
          country: this.clientObject.country,
          province: this.clientObject.province,
          location: this.clientObject.location,
          cp: this.clientObject.cp,
          address: this.clientObject.address,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit(): void {
    this.isSent = true;
    // Process checkout data here
    if (!this.clientForm.invalid) {
      if (this.id == 'new') {
        this.clientService.save(this.clientForm.value).subscribe(
          (data) => {
            this.router.navigate(['/dashboard/client']);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.clientObject.name = this.clientForm.controls.name.value;
        this.clientObject.surname = this.clientForm.controls.surname.value;
        this.clientObject.nif = this.clientForm.controls.nif.value;
        this.clientObject.phone = this.clientForm.controls.phone.value;
        this.clientObject.phonePrefix =
          this.clientForm.controls.phonePrefix.value;
        this.clientObject.country = this.clientForm.controls.country.value;
        this.clientObject.province = this.clientForm.controls.province.value;
        this.clientObject.location = this.clientForm.controls.location.value;
        this.clientObject.cp = this.clientForm.controls.cp.value;
        this.clientObject.address = this.clientForm.controls.address.value;

        this.clientService.update(this.clientObject).subscribe(
          (data) => {
            this.router.navigate(['/dashboard/client']);
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
