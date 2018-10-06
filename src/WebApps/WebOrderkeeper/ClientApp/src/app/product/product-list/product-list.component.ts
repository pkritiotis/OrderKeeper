import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() products: Product[];
  @Output() deleteProductRequested = new EventEmitter<Product>();
  @Output() modifyProductRequested = new EventEmitter<Product>();

  constructor() { }

  ngOnInit() {
  }
  onDelete(product: Product) {
    this.deleteProductRequested.emit(product);
  }
  onModify(product: Product) {
    this.modifyProductRequested.emit(product);
  }
}
