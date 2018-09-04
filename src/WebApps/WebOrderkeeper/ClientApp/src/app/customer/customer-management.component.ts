import { Component, OnInit } from '@angular/core';
import { Customer } from '../shared/models/customer.model';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.css']
})
export class CustomerManagementComponent implements OnInit {

  customers: Customer[];
  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.customersReady$.subscribe(x => {
      this.getCustomers();
    });
  }
  getCustomers(): void {
    this.customerService.getCustomers().subscribe(customers => this.customers = customers);
  }

}
