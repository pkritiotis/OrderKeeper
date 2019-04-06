import { ProductService } from './../../product/product.service';
import { CustomerService } from './../../customer/customer.service';
import { OrderItem } from './../../shared/models/order.model';
import { OrderService } from '../order.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../shared/models/order.model';
import { Location } from '@angular/common';
import { NotifierService } from 'angular-notifier';
import { Customer } from '../../shared/models/customer.model';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  order: Order;
  loading: boolean;
  action: string;
  customers: Customer[];
  products: Product[];

  constructor(private route: ActivatedRoute,
    private orderService: OrderService,
    private location: Location,
    private notificationService: NotifierService,
    private customerService: CustomerService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.loading = true;

    this.loadCustomers();
    this.loadAvailableProducts();
    this.action = this.route.snapshot.data['action'];
    if (this.action === 'edit') {
      const id = this.route.snapshot.paramMap.get('id');
      if (this.orderService.isReady) {
        this.orderService.getOrderById(id)
          .subscribe(order => { this.order = order; console.log(JSON.stringify(order)); this.loading = false; });
      }
      this.orderService.ordersReady$.subscribe(x => {
        this.orderService.getOrderById(id)
          .subscribe(order => { this.order = order; console.log(JSON.stringify(order)); this.loading = false; });
      });
    }

    if (this.action === 'create') {
      this.order = {
        'customerId': -1,
        'dateCreated': new Date(),
        'dateIssued': new Date(),
        'dateModified': new Date(),
        'orderItems': [this.getEmptyOrderItem()],
        'TotalAmount': 10
      };
      this.loading = false;
    }
  }

  loadCustomers() {
    this.customerService.customersReady$.subscribe(() => {
      this.customerService.getCustomers().subscribe(x => { this.customers = x; console.log(JSON.stringify(this.customers)); });
    });
  }

  loadAvailableProducts() {
    this.productService.productsReady$.subscribe(() => {
      this.productService.getProducts().subscribe(x => {this.products = x; });
    });
  }

  onUpdate() {
    this.loading = true;
    this.orderService.updateOrder(this.order).subscribe(res => {
      this.loading = false;
      this.location.back();
      this.notificationService.notify('success', `${this.order.id} updated successfully`);
    });
  }

  onCreate() {
    this.loading = true;
    this.orderService.createOrder(this.order).subscribe(res => {
      this.loading = false;
      this.location.back();
      this.notificationService.notify('success', `${res.id} added successfully`);
    });
  }
 
  onAddOrderItem() {
    this.order.orderItems.push(this.getEmptyOrderItem());
  }

  getEmptyOrderItem(): OrderItem {
    return { 'productId': -1, 'productName': '0', 'unitPrice': 0, 'initialUnitPrice': 0, 'quantity': 0 };
  }
}
