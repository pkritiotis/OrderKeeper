import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ConfirmationModalService } from '../shared/components/confirmation-modal/confirmation-modal.service';
import { Order } from '../shared/models/order.model';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {

  orders: Order[];
  loading = true;

  constructor(private orderService: OrderService
    , private router: Router
    , private notificationService: NotifierService
    , private confirmationModalService: ConfirmationModalService) {
    this.orderService.ordersReady$.subscribe(x => {
      this.getOrders();
    });
  }

  ngOnInit() {
    if (this.orderService.isReady) {
      this.getOrders();
    }
  }
  getOrders(): void {
    this.orderService.getOrders().subscribe(orders => { this.orders = orders; this.loading = false; });
  }

  deleteOrder(order: Order) {
    this.confirmationModalService.confirm('Delete order', `Do you want to delete ${order.id}?`)
      .then((confirmed) => {
        if (confirmed) {
          this.loading = true;
          this.orderService.deleteOrder(order).subscribe(res => {
            this.notificationService.notify('success', 'Order Deleted Successfully');
            this.loading = false;
            this.getOrders();
           });
        }
      })
      .catch(() => console.log('cancelled'));
  }

  modifyOrder(order: Order) {
    this.router.navigate([`order/${order.id}/edit`]);
  }
}
