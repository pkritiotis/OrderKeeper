import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { ApiModule } from './modules/api.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CustomerManagementComponent } from './customer-management/customer-management.component';
import { CustomerListComponent } from './customer-management/customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer-management/customer-detail/customer-detail.component';

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
    ApiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
