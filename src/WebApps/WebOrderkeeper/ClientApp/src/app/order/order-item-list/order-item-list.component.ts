import { OrderItem } from '../../shared/models/order.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-order-item-list',
  templateUrl: './order-item-list.component.html',
  styleUrls: ['./order-item-list.component.css']
})
export class OrderItemListComponent implements OnInit {

  @Input() orderItemList: OrderItem[];
  @Output() orderItemListChanged = new EventEmitter();

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

  ngOnInit() {
   }

  onChange(){
    this.orderItemListChanged.emit();
  }

  getTotalPrice(productId , quantity ): any {
    if(this.products.filter(x => x.id === +productId).length === 0){
      return '-';
    }
    return this.products.filter(x => x.id === +productId)[0].price * quantity;
   }

  onDelete(orderItem: OrderItem) {
    this.deleteOrderItemRequested.emit(orderItem);
  }

}
