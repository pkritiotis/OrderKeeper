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

@Injectable()
export class CustomerService {
    private CustomerUrl = '';

    constructor(private service: DataService, private configurationService: ConfigurationService) {
        this.configurationService.settingsLoaded$.subscribe(x => {
            this.CustomerUrl = this.configurationService.serverSettings.CustomerUrl + '/api/Customer/';
        });
    }

    getCustomers(): Observable<Customer[]> {
        return this.service.get(this.CustomerUrl).map((response: Response) => {
            return response.json();
        });
    }
}
