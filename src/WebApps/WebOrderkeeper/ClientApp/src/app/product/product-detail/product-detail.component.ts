import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../shared/models/product.model';
import { Location } from '@angular/common';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  loading: boolean;
  action: string;
  constructor(private route: ActivatedRoute,
             private productService: ProductService,
             private location: Location,
             private notificationService: NotifierService
             ) { }

  ngOnInit() {
    this.loading = true;
    this.action = this.route.snapshot.data['action'];
    if (this.action === 'edit') {
      const id = +this.route.snapshot.paramMap.get('id');
      if (this.productService.isReady) {
        this.productService.getProductById(id)
          .subscribe(product => { this.product = product; console.log(JSON.stringify(product)); this.loading = false; });
      }
      this.productService.productsReady$.subscribe(x => {
        this.productService.getProductById(id)
          .subscribe(product => { this.product = product; console.log(JSON.stringify(product)); this.loading = false; });
      });
    }

    if (this.action === 'create') {
      this.product = { 'id': 0, 'name': '', 'price': 0.0, 'priceCurrency': '', 'stockNumber': 0, 'unit': '' };
      this.loading = false;
    }
  }

  onUpdate() {
    this.loading = true;
    this.productService.updateProduct(this.product).subscribe(res => {
      this.loading = false;
      this.location.back();
      this.notificationService.notify('success', `${this.product.name} updated successfully`);
    });
  }

  onCreate() {
    this.loading = true;
    this.productService.createProduct(this.product).subscribe(res => {
      this.loading = false;
      this.location.back();
      this.notificationService.notify('success', `${res.name} added successfully`);
     });
  }
}
