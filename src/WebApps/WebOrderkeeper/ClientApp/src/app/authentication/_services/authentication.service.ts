import { SecurityService } from './../../shared/services/security.service';
import { StorageService } from './../../shared/services/storage.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ConfigurationService } from '../../shared/services/configuration.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    constructor(private http: HttpClient, private configurationService: ConfigurationService, private storageService: StorageService, private securityService: SecurityService) { }

    login(email: string, password: string) {
        const identityApiUrl = this.configurationService.serverSettings.identityUrl + 'account/login';
        return this.http.post<any>(identityApiUrl, { email, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                // if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    this.securityService.IsAuthorized = true;
                    this.securityService.SetAuthorizationData(user, user);
                // }

                return user;
            }));
    }

    logout() {
        this.storageService.store('currentUser', '');
    }
}
