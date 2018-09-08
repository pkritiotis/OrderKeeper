import { Component, OnInit } from '@angular/core';
import { Customer } from '../shared/models/customer.model';
import { CustomerService } from './customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.css']
})
export class CustomerManagementComponent implements OnInit {

  customers: Customer[];
  loading = true;

  constructor(private customerService: CustomerService
             , private router: Router) {
    this.customerService.customersReady$.subscribe(x => {
      this.getCustomers();
    });
   }

  ngOnInit() {
    if (this.customerService.isReady) {
      this.getCustomers();
    }
  }
  getCustomers(): void {
    this.customerService.getCustomers().subscribe(customers =>{ this.customers = customers; this.loading = false; });
  }

  deleteCustomer(customer: Customer) {
    console.log(`requested ${customer.fullName} to be deleted`);
  }

  modifyCustomer(customer: Customer) {
    console.log(`requested ${customer.fullName} to be modified`);
    this.router.navigate([`customer/${customer.id}`]);
  }

}
