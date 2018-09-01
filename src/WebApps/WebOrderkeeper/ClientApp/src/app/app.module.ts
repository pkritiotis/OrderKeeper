import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { CustomerManagementComponent } from './customer/customer-management.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CustomerManagementComponent,
    CustomerListComponent,
    CustomerDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
