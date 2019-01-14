import { catchError } from 'rxjs/operators';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from './storage/sessionstorage.service';
import { ConfigurationService } from './configuration.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SecurityService {

    private headers: Headers;

    public IsAuthorized: boolean;
    public UserData: any;
    public is_persistent: boolean;

    constructor(private _http: Http,
        private _configurationService: ConfigurationService,
        private _storageService: SessionStorageService,
        private _router: Router) {

        // Initialize Headers - set content type to json
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');

        if (_storageService.retrieve('IsAuthorized') !== '') {
            this.IsAuthorized = _storageService.retrieve('IsAuthorized');
            this.UserData = _storageService.retrieve('userData');
        }
    }

    public LogIn(email, password, rememberMe) {
        const identityApiUrl = this._configurationService.serverSettings.identityUrl + '/account/login';
        return this._http.post(identityApiUrl, { email, password })
            .map(token => {
                // login successful if there's a jwt token in the response
                this.IsAuthorized = true;
                this.is_persistent = rememberMe;
                this.SetAuthorizationData(token.json(), 'jwt');
            }
            )
            .catch(error => { console.log(error); return Observable.throw(this.HandleError(error)); });
    }

    public Logoff() {
        return this.ResetAuthorizationData();
    }

    public GetToken(): any {
        return this._storageService.retrieve('authorizationData');
    }

    public ResetAuthorizationData() {
        // cleanup authorized data from storage service
        this._storageService.store('authorizationData', '');
        this._storageService.store('authorizationDataIdToken', '');
        this._storageService.store('IsAuthorized', false);

        this.IsAuthorized = false;
    }

    private SetAuthorizationData(token: string, id_token: string) {
        // cleanup current authorization token
        if (this._storageService.retrieve('authorizationData') !== '') {
            this._storageService.store('authorizationData', '');
        }

        // set new authorization token
        this._storageService.store('authorizationData', token);
        this._storageService.store('authorizationDataIdToken', id_token);
        this.IsAuthorized = true;
        this._storageService.store('IsAuthorized', true);
    }

    private HandleError(error: any) {
        console.log(error);
        if (error.status === 403) {
            this._router.navigate(['/Forbidden']);
        } else if (error.status === 401) {
            // this.ResetAuthorizationData();
            this._router.navigate(['/Unauthorized']);
        }
    }
}
