import { Customer } from './../shared/models/customer.model';
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
export class CustomerService {
    private CustomerUrl = '';
    // observable that is fired when settings are loaded from server
    private customerLoadedSource = new Subject();
    customersReady$ = this.customerLoadedSource.asObservable();
    isReady = false;

    constructor(private service: DataService, private configurationService: ConfigurationService, private http: HttpClient) {
        if (this.configurationService.isReady) {
            this.CustomerUrl = this.configurationService.serverSettings.customerUrl + '/api/Customer/';
            this.isReady = true;
        }
        this.configurationService.settingsLoaded$.subscribe(x => {
            this.CustomerUrl = this.configurationService.serverSettings.customerUrl + '/api/Customer/';
            this.customerLoadedSource.next();
            this.isReady = true;
        });
    }

    getCustomers(): Observable<Customer[]> {
        return this.http.get<Customer[]>(this.CustomerUrl);
    }

    getCustomerById(id: number): Observable<Customer> {
        return this.http.get<Customer>(`${this.CustomerUrl}${id}`);
    }
    updateCustomer(customer: Customer): any {
        return this.http.put<Customer>(`${this.CustomerUrl}`, customer);
      }
}
