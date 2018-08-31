import { Customer } from './../modules/model/customer';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerService } from '../modules';

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.css']
})
export class CustomerManagementComponent implements OnInit {

  customers: Customer[];
  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getCustomers();
  }
  getCustomers(): void {
    this.customerService.apiCustomerGet().subscribe(customers => this.customers = customers);
  }

}
