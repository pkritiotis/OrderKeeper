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
  @Input() availableProductList: Product[];
  @Output() orderItemListChanged = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChange() {
    this.orderItemListChanged.emit();
  }

  getTotalPrice(productId, quantity): any {
    if (!this.availableProductList || this.availableProductList.length === 0 ||
       this.availableProductList.filter(x => x.id === +productId).length === 0) {
      return '-';
    }
    return this.availableProductList.filter(x => x.id === +productId)[0].price * quantity;
  }
  getUnit(productId): any {
    return this.availableProductList.filter(x => x.id === +productId)[0].unit;
  }

  getInitialUnitValue(productId): any {
    return this.availableProductList.filter(x => x.id === +productId)[0].price;
  }

  onDelete(orderItem: OrderItem) {
    //this.deleteOrderItemRequested.emit(orderItem);
  }

}
