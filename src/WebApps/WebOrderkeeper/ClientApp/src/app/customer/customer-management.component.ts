import { NotifierService } from 'angular-notifier';
import { ConfirmationModalService } from './../shared/components/confirmation-modal/confirmation-modal.service';
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
    , private router: Router
    , private notificationService: NotifierService
    , private confirmationModalService: ConfirmationModalService) {
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
    this.customerService.getCustomers().subscribe(customers => { this.customers = customers; this.loading = false; });
  }

  deleteCustomer(customer: Customer) {
    this.confirmationModalService.confirm('Delete customer', `Do you want to delete ${customer.fullName}?`)
      .then((confirmed) => {
        if (confirmed) {
          this.loading = true;
          this.customerService.deleteCustomer(customer).subscribe(res => {
            this.notificationService.notify('success', 'Customer Deleted Successfully');
            this.loading = false;
            this.getCustomers();
           });
        }
      })
      .catch(() => console.log('cancelled'));
  }

  modifyCustomer(customer: Customer) {
    this.router.navigate([`customer/${customer.id}/edit`]);
  }
}
