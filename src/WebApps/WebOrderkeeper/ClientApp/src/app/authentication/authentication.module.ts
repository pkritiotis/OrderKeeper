import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfigurationService } from '../shared/services/configuration.service';
import { StorageService } from '../shared/services/storage.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routing } from '../app.routing';
import { JwtInterceptor } from '../shared/_httpinterceptors/jwt.interceptor';
import { ErrorInterceptor } from '../shared/_httpinterceptors/error.interceptor';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  declarations: [LoginComponent, RegistrationComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ConfigurationService,
    StorageService,
  ]
})
export class AuthenticationModule { }
