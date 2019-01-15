import { OrderItem } from './../../shared/models/order.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {

  @Input() orderItem: OrderItem;
  @Output() deleteOrderRequested = new EventEmitter<OrderItem>();
  @Output() modifyOrderRequested = new EventEmitter<OrderItem>();

  constructor() { }

  products: Product[] = [{'id': 1,
  'name': 'Gypsofilla',
  'price': 11.5,
  'priceCurrency': 'Euro',
  'stockNumber': 12,
  'unit': 'Bunch',
  },
  {'id': 2,
  'name': 'Helianthus',
  'price': 1.5,
  'priceCurrency': 'Euro',
  'stockNumber': 9,
  'unit': 'Bunch',
  }];

  ngOnInit() { }

  onDelete(orderItem: OrderItem) {
    this.deleteOrderRequested.emit(orderItem);
  }

}
