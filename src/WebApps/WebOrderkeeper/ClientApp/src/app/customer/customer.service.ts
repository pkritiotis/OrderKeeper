import { Customer } from './../shared/models/customer.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { DataService } from '../shared/services/data.service';
import { ConfigurationService } from '../shared/services/configuration.service';
import { Customer } from '../shared/models/customer.model';

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

    constructor(private service: DataService, private configurationService: ConfigurationService, private http: HttpClient) {
        this.configurationService.settingsLoaded$.subscribe(x => {
            this.CustomerUrl = this.configurationService.serverSettings.customerUrl + '/api/Customer/';
            this.customerLoadedSource.next();
        });
    }

    getCustomers(): Observable<Customer[]> {
        return this.http.get<Customer[]>(this.CustomerUrl);
    }
}
