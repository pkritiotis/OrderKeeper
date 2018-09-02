import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfigurationService } from '../shared/services/configuration.service';
import { StorageService } from '../shared/services/storage.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
  ],
  declarations: [LoginComponent, RegistrationComponent],
  providers: [
    ConfigurationService,
    StorageService,
  ]
})
export class AuthenticationModule { }
