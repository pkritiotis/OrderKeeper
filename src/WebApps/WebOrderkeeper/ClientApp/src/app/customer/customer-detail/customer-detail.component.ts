import { CustomerService } from './../customer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../shared/models/customer.model';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  customer: Customer;
  loading: boolean;
  constructor(private route: ActivatedRoute, private customerService: CustomerService) { }

  ngOnInit() {
    this.loading = true;
    const id = +this.route.snapshot.paramMap.get('id');
    if (this.customerService.isReady) {
      this.customerService.getCustomerById(id)
        .subscribe(customer => {this.customer = customer; console.log(JSON.stringify(customer)); this.loading = false; });
    }
    this.customerService.customersReady$.subscribe(x => {
      this.customerService.getCustomerById(id)
        .subscribe(customer => {this.customer = customer; console.log(JSON.stringify(customer)); this.loading = false; });
    });
  }

}
