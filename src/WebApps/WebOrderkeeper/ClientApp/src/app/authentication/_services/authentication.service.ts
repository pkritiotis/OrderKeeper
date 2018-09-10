import { SecurityService } from './../../shared/services/security.service';
import { StorageService } from './../../shared/services/storage.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ConfigurationService } from '../../shared/services/configuration.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    constructor(private http: HttpClient, private configurationService: ConfigurationService,
                private storageService: StorageService, private securityService: SecurityService) { }

    login(email: string, password: string, remember_me: boolean) {
        return this.securityService.LogIn(email, password, remember_me);
    }

    logout() {
        this.securityService.Logoff();
    }
}
