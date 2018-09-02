import { Http, ConnectionBackend, HttpModule } from '@angular/http';
import { StorageService } from './shared/services/storage.service';
import { CustomerService } from './customer/customer.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { routing } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { CustomerManagementComponent } from './customer/customer-management.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './shared/_httpinterceptors/error.interceptor';
import { JwtInterceptor } from './shared/_httpinterceptors/jwt.interceptor';
import { DataService } from './shared/services/data.service';
import { SecurityService } from './shared/services/security.service';
import { ConfigurationService } from './shared/services/configuration.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CustomerManagementComponent,
    CustomerListComponent,
    CustomerDetailComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    AuthenticationModule,
    HttpModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    CustomerService,
    DataService,
    StorageService,
    SecurityService,
    ConfigurationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
