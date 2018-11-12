import { Http, ConnectionBackend, HttpModule } from '@angular/http';
import { StorageService } from './shared/services/storage.service';
import { CustomerService } from './customer/customer.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { routing } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { SecurityService } from './shared/services/security.service';
import { ConfigurationService } from './shared/services/configuration.service';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { NotifierModule } from 'angular-notifier';
import { ConfirmationModalComponent } from './shared/components/confirmation-modal/confirmation-modal.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalService } from './shared/components/confirmation-modal/confirmation-modal.service';
import { ProductManagementComponent } from './product/product-management.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductService } from './product/product.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CustomerManagementComponent,
    CustomerListComponent,
    CustomerDetailComponent,
    ProductManagementComponent,
    ProductListComponent,
    ProductDetailComponent,
    HomeComponent,
    LoadingComponent,
    ConfirmationModalComponent
  ],
  entryComponents: [ConfirmationModalComponent],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    AuthenticationModule,
    HttpModule,
    ReactiveFormsModule,
    NotifierModule,
    NgbModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    CustomerService,
    StorageService,
    SecurityService,
    ConfigurationService,
    ConfirmationModalService,
    NgbActiveModal,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
