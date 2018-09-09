import { CustomerService } from './../customer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../shared/models/customer.model';
import { Location } from '@angular/common';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  customer: Customer;
  loading: boolean;
  action: string;
  constructor(private route: ActivatedRoute,
             private customerService: CustomerService,
             private location: Location,
             private notificationService: NotifierService
             ) { }

  ngOnInit() {
    this.loading = true;
    this.action = this.route.snapshot.data['action'];
    if (this.action === 'edit') {
      const id = +this.route.snapshot.paramMap.get('id');
      if (this.customerService.isReady) {
        this.customerService.getCustomerById(id)
          .subscribe(customer => { this.customer = customer; console.log(JSON.stringify(customer)); this.loading = false; });
      }
      this.customerService.customersReady$.subscribe(x => {
        this.customerService.getCustomerById(id)
          .subscribe(customer => { this.customer = customer; console.log(JSON.stringify(customer)); this.loading = false; });
      });
    }

    if (this.action === 'create') {
      this.customer = { 'id': 0, 'fullName': '', 'phoneNumber': '', 'address': '', 'emailAddress': '', 'fax': '' };
      this.loading = false;
    }
  }

  onUpdate() {
    this.loading = true;
    this.customerService.updateCustomer(this.customer).subscribe(res => {
      this.loading = false;
      this.location.back();
      this.notificationService.notify('success', `${this.customer.fullName} updated successfully`);
    });
  }

  onCreate() {
    this.loading = true;
    this.customerService.createCustomer(this.customer).subscribe(res => {
      this.loading = false;
      this.location.back();
      this.notificationService.notify('success', `${res.fullName} added successfully`);
     });
  }
}
