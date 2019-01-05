import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService) {}

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          emailAddress: ['', Validators.required],
          password: ['', Validators.required],
          remember_me : [false]
      });

      // reset login status
      this.authenticationService.Logout();

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.authenticationService.Login(this.f.emailAddress.value, this.f.password.value, this.f.remember_me.value)
           .subscribe(
               data => {
                  this.router.navigate([this.returnUrl]);
               },
               error => {
                   this.error = error;
                   this.loading = false;
               });
  }
}
