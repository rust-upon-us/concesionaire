import { Component, OnInit } from '@angular/core';
import { UserService } from './../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSent= false;

  checkoutForm = this.formBuilder.group({
    username: '',
    password: '',
  });

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-zd].{6,}'),
        ],
      ],
    });
    // Password validation number uppercase and lowercase and 6 min chars
  }

  ngOnInit() {}

  get form(): any {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.isSent = true;
    if (this.loginForm.invalid) {
      this.loginForm.invalid;
      return;
    }
    let user = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value,
    };

    console.log(user)
    this.userService.login(user).subscribe(
      (data) => {
        localStorage.setItem('token', data.access_token || '');
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
