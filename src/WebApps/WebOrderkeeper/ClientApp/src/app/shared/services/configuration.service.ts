import { Injectable }       from '@angular/core';
import { Http, Response, RequestOptionsArgs, RequestMethod, Headers } from '@angular/http';
import { IConfiguration }   from '../models/configuration.model';
import { SessionStorageService }   from './storage/sessionstorage.service';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class ConfigurationService {
    serverSettings: IConfiguration;

    private settingsLoadedSource = new Subject();
    settingsLoaded$ = this.settingsLoadedSource.asObservable();
    isReady = false;

    constructor(private http: Http, private storageService: SessionStorageService) {
     }

    load() {
        const baseURI = document.baseURI.endsWith('/') ? document.baseURI : `${document.baseURI}/`;
        const url = `${baseURI}api/Configuration`;
        this.http.get(url).subscribe((response: Response) => {
            this.serverSettings = response.json();
            this.storageService.store('IdentityUrl', this.serverSettings.identityUrl);
            this.storageService.store('CustomerUrl', this.serverSettings.customerUrl);
            this.isReady = true;
            this.settingsLoadedSource.next();
        });
    }
}
