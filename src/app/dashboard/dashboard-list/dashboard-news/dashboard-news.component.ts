import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from './../../../models/news.model';
import { NewsService } from './../../../services/news.service';

@Component({
  selector: 'app-dashboard-news',
  templateUrl: './dashboard-news.component.html',
  styleUrls: ['./dashboard-news.component.scss'],
})
export class DashboardNewsComponent implements OnInit {
  @Input() id: string;
  isSent: Boolean = false;
  newsObject: News;
  newsForm: FormGroup;
  newImage:String ="";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private newsService: NewsService,
    private formBuilder: FormBuilder
  ) {
    this.newsForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      message: ['', [Validators.required]],
      link: [''],
      image: ['', [Validators.required]],
      type: ['', [Validators.required]],
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
    return this.newsForm.controls;
  }

  getData() {
    this.newsService.getItem(this.id).subscribe(
      (data) => {
        this.newsObject = data;
        this.newsForm.setValue({
          title: this.newsObject.title,
          message: this.newsObject.message,
          link: this.newsObject.link,
          image: this.newsObject.image,
          type: this.newsObject.type,
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
    if (!this.newsForm.invalid) {
      if (this.id == 'new') {
        this.newsService.save(this.newsForm.value).subscribe(
          (data) => {
            this.router.navigate(['/dashboard/news']);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.newsObject.title = this.newsForm.controls.title.value;
        this.newsObject.message = this.newsForm.controls.message.value;
        this.newsObject.link = this.newsForm.controls.link.value;
        this.newsObject.image = this.newsForm.controls.image.value;
        this.newsObject.type = this.newsForm.controls.type.value;

        console.log(this.newsObject);
        this.newsService.update(this.newsObject).subscribe(
          (data) => {
            this.router.navigate(['/dashboard/news']);
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

  displayImage(){
    console.log("hello world")
    this.newImage = this.newsForm.controls.image.value;
  }
}
