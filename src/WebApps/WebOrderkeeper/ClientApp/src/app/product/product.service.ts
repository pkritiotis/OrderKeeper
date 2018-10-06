import { Product } from './../shared/models/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { DataService } from '../shared/services/data.service';
import { ConfigurationService } from '../shared/services/configuration.service';

// import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProductService {
    private ProductUrl = '';
    // observable that is fired when settings are loaded from server
    private productLoadedSource = new Subject();
    productsReady$ = this.productLoadedSource.asObservable();
    isReady = false;

    constructor(private service: DataService, private configurationService: ConfigurationService, private http: HttpClient) {
        if (this.configurationService.isReady) {
            this.ProductUrl = this.configurationService.serverSettings.productUrl + '/api/Product/';
            this.isReady = true;
        }
        this.configurationService.settingsLoaded$.subscribe(x => {
            this.ProductUrl = this.configurationService.serverSettings.productUrl + '/api/Product/';
            this.productLoadedSource.next();
            this.isReady = true;
        });
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.ProductUrl);
    }

    getProductById(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.ProductUrl}${id}`);
    }

    updateProduct(product: Product): any {
        return this.http.put<Product>(`${this.ProductUrl}`, product);
    }

    createProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(`${this.ProductUrl}`, product);
    }

    deleteProduct(product: Product): any {
        return this.http.delete<Product>(`${this.ProductUrl}?productId=${product.id}`);
    }

}
