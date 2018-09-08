import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Customer } from '../../shared/models/customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  @Input() customers: Customer[];
  @Output() deleteCustomerRequested = new EventEmitter<Customer>();
  @Output() modifyCustomerRequested = new EventEmitter<Customer>();

  constructor() { }

  ngOnInit() {
  }
  onDelete(customer: Customer) {
    this.deleteCustomerRequested.emit(customer);
  }
  onModify(customer: Customer) {
    this.modifyCustomerRequested.emit(customer);
  }
}
