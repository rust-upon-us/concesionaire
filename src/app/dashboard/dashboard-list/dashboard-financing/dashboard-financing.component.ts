import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Financing } from './../../../models/financing.model';
import { FinancingService } from './../../../services/financing.service';

@Component({
  selector: 'app-dashboard-financing',
  templateUrl: './dashboard-financing.component.html',
  styleUrls: ['./dashboard-financing.component.scss'],
})
export class DashboardFinancingComponent implements OnInit {
  @Input() id: string;
  isSent: Boolean = false;
  financingForm: FormGroup;
  financingObject: Financing;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private financingService: FinancingService,
    private datePipe: DatePipe
  ) {
    this.financingForm = this.formBuilder.group({
      source: ['', [Validators.required]],
      effect: [Number, [Validators.required]],
      description: ['', [Validators.required]],
      release: [Date, [Validators.required]],
      availability: [Date, [Validators.required]],
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
    return this.financingForm.controls;
  }

  getData() {
    this.financingService.getItem(this.id).subscribe(
      (data) => {
        this.financingObject = data;
        this.financingForm.setValue({
          source: this.financingObject.source,
          effect: this.financingObject.effect,
          description: this.financingObject.description,
          release: this.datePipe.transform(
            this.financingObject.release,
            'yyyy-MM-dd'
          ),
          availability: this.datePipe.transform(
            this.financingObject.availability,
            'yyyy-MM-dd'
          ),
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
    if (!this.financingForm.invalid) {
      if (this.id == 'new') {
        this.financingService.save(this.financingForm.value).subscribe(
          (data) => {
            this.router.navigate(['/dashboard/financing']);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.financingObject.source = this.financingForm.controls.source.value;
        this.financingObject.effect = this.financingForm.controls.effect.value;
        this.financingObject.description =
          this.financingForm.controls.description.value;
        this.financingObject.release =
          this.financingForm.controls.release.value;
        this.financingObject.availability =
          this.financingForm.controls.availability.value;

        this.financingService.update(this.financingObject).subscribe(
          (data) => {
            this.router.navigate(['/dashboard/financing']);
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
