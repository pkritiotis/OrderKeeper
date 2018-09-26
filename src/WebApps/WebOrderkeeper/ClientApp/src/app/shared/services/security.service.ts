import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ConfigurationService } from './configuration.service';
import { StorageService } from './storage.service';

@Injectable()
export class SecurityService {

    private headers: Headers;
    private identityUrl = '';

    public IsAuthorized: boolean;
    public UserData: any;
    public is_persistent = true;

    constructor(private _http: Http, private _router: Router,
        private route: ActivatedRoute, private _configurationService: ConfigurationService,
        private _storageService: StorageService) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');

        this._configurationService.settingsLoaded$.subscribe(x => {
            this.identityUrl = this._configurationService.serverSettings.identityUrl;
            _storageService.store('IdentityUrl', this.identityUrl);
        });

        if (_storageService.retrieve('IsAuthorized', true) !== '') {
            this.IsAuthorized = _storageService.retrieve('IsAuthorized', true);
            this.UserData = _storageService.retrieve('userData', true);
        } else
        if (_storageService.retrieve('IsAuthorized') !== '') {
            this.IsAuthorized = _storageService.retrieve('IsAuthorized');
            this.UserData = _storageService.retrieve('userData');
        }
    }

    LogIn(email, password, rememberMe): any {
        const identityApiUrl = this._configurationService.serverSettings.identityUrl + 'account/login';
        return this._http.post(identityApiUrl, { email, password })
            .map(user => {
                // login successful if there's a jwt token in the response
                this.IsAuthorized = true;
                this.is_persistent = rememberMe;
                this.SetAuthorizationData(user.json(), 'jwt');
                return user;
            });
    }

    public GetToken(): any {
        return this._storageService.retrieve('authorizationData', this.is_persistent);
    }

    public ResetAuthorizationData() {
        this._storageService.store('authorizationData', '' , this.is_persistent);
        this._storageService.store('authorizationDataIdToken', '', this.is_persistent);
        this.IsAuthorized = false;
        this._storageService.store('IsAuthorized', false, this.is_persistent);
    }

    public SetAuthorizationData(token: any, id_token: any) {
        if (this._storageService.retrieve('authorizationData', this.is_persistent) !== '') {
            this._storageService.store('authorizationData', '', this.is_persistent);
        }

        this._storageService.store('authorizationData', token, this.is_persistent);
        this._storageService.store('authorizationDataIdToken', id_token, this.is_persistent);
        this.IsAuthorized = true;
        this._storageService.store('IsAuthorized', true, this.is_persistent);

        // this.getUserData()
        //     .subscribe(data => {
        //         this.UserData = data;
        //         this._storageService.store('userData', data);
        //         window.location.href = location.origin;
        //     },
        //         error => this.HandleError(error),
        //         () => {
        //             console.log(this.UserData);
        //         });
    }

    public Logoff() {
        return this.ResetAuthorizationData();
    }

    public HandleError(error: any) {
        console.log(error);
        if (error.status === 403) {
            this._router.navigate(['/Forbidden']);
        } else if (error.status === 401) {
            // this.ResetAuthorizationData();
            this._router.navigate(['/Unauthorized']);
        }
    }

    private urlBase64Decode(str: string) {
        let output = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw new Error('Illegal base64url string!');
        }

        return window.atob(output);
    }

    private getDataFromToken(token: any) {
        let data = {};
        if (typeof token !== 'undefined') {
            const encoded = token.split('.')[1];
            data = JSON.parse(this.urlBase64Decode(encoded));
        }

        return data;
    }


    private getUserData = (): Observable<string[]> => {
        // this.setHeaders();
        // if (this.identityUrl === '') {
        //     this.identityUrl = this._storageService.retrieve('IdentityUrl');
        // }
        return null;
        // return this._http.get(this.identityUrl + '/account/userinfo', {
        //     headers: this.headers,
        //     body: ''
        // }).map(res => res.json());
    }

    private setHeaders() {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');

        const token = this.GetToken();

        if (token !== '') {
            this.headers.append('Authorization', 'Bearer ' + token);
        }
    }
}
