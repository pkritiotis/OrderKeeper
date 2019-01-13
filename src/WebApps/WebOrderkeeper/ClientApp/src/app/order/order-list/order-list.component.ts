import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Order } from '../../shared/models/order.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  @Input() orders: Order[];
  @Output() deleteOrderRequested = new EventEmitter<Order>();
  @Output() modifyOrderRequested = new EventEmitter<Order>();

  constructor() { }

  ngOnInit() {
  }
  onDelete(order: Order) {
    this.deleteOrderRequested.emit(order);
  }
  onModify(order: Order) {
    this.modifyOrderRequested.emit(order);
  }
}
