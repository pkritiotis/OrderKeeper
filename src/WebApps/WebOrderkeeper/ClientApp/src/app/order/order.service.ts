import { Order } from '../shared/models/order.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { ConfigurationService } from '../shared/services/configuration.service';

// import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class OrderService {
    private OrderUrl = '';
    // observable that is fired when settings are loaded from server
    private orderLoadedSource = new Subject();
    ordersReady$ = this.orderLoadedSource.asObservable();
    isReady = false;

    constructor(private configurationService: ConfigurationService, private http: HttpClient) {
        if (this.configurationService.isReady) {
            this.OrderUrl = this.configurationService.serverSettings.orderUrl + '/api/Order/';
            this.isReady = true;
        }
        this.configurationService.settingsLoaded$.subscribe(x => {
            this.OrderUrl = this.configurationService.serverSettings.orderUrl + '/api/Order/';
            this.orderLoadedSource.next();
            this.isReady = true;
        });
    }

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.OrderUrl);
    }

    getOrderById(id: number): Observable<Order> {
        return this.http.get<Order>(`${this.OrderUrl}${id}`);
    }

    updateOrder(order: Order): any {
        return this.http.put<Order>(`${this.OrderUrl}`, order);
    }

    createOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(`${this.OrderUrl}`, order);
    }

    deleteOrder(order: Order): any {
        return this.http.delete<Order>(`${this.OrderUrl}?orderId=${order.id}`);
    }

}
