import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hardware } from './../../../models/hardware.model';
import { HardwareService } from './../../../services/hardware.service';

@Component({
  selector: 'app-dashboard-hardware',
  templateUrl: './dashboard-hardware.component.html',
  styleUrls: ['./dashboard-hardware.component.scss'],
})
export class DashboardHardwareComponent implements OnInit {
  @Input() id: string;
  isSent: Boolean = false;
  hardwareForm: FormGroup;
  hardwareObject: Hardware;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private hardwareService: HardwareService,
    private formBuilder: FormBuilder
  ) {
    this.hardwareForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      functionality: ['', [Validators.required]],
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
  }

  get form(): any {
    return this.hardwareForm.controls;
  }

  getData() {
    this.hardwareService.getItem(this.id).subscribe(
      (data) => {
        this.hardwareObject = data;
        this.hardwareForm.setValue({
          name: this.hardwareObject.name,
          description: this.hardwareObject.description,
          functionality: this.hardwareObject.functionality,
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
    if (!this.hardwareForm.invalid) {
      if (this.id == 'new') {
        this.hardwareService.save(this.hardwareForm.value).subscribe(
          (data) => {
            this.router.navigate(['/dashboard/hardware']);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.hardwareObject.name = this.hardwareForm.controls.name.value;
        this.hardwareObject.description =
          this.hardwareForm.controls.description.value;
        this.hardwareObject.functionality =
          this.hardwareForm.controls.functionality.value;
        this.hardwareService.update(this.hardwareObject).subscribe(
          (data) => {
            this.router.navigate(['/dashboard/hardware']);
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
