import { NotifierService } from 'angular-notifier';
import { ConfirmationModalService } from './../shared/components/confirmation-modal/confirmation-modal.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product.model';
import { ProductService } from './product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {

  products: Product[];
  loading = true;

  constructor(private productService: ProductService
    , private router: Router
    , private notificationService: NotifierService
    , private confirmationModalService: ConfirmationModalService) {
    this.productService.productsReady$.subscribe(x => {
      this.getProducts();
    });
  }

  ngOnInit() {
    if (this.productService.isReady) {
      this.getProducts();
    }
  }
  getProducts(): void {
    this.productService.getProducts().subscribe(products => { this.products = products; this.loading = false; });
  }

  deleteProduct(product: Product) {
    this.confirmationModalService.confirm('Delete product', `Do you want to delete ${product.name}?`)
      .then((confirmed) => {
        if (confirmed) {
          this.loading = true;
          this.productService.deleteProduct(product).subscribe(res => {
            this.notificationService.notify('success', 'Product Deleted Successfully');
            this.loading = false;
            this.getProducts();
           });
        }
      })
      .catch(() => console.log('cancelled'));
  }

  modifyProduct(product: Product) {
    this.router.navigate([`product/${product.id}/edit`]);
  }
}
