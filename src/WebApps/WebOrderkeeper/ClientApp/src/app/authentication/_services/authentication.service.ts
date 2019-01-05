import { SecurityService } from './../../shared/services/security.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    constructor(private securityService: SecurityService) { }

    Login(email: string, password: string, remember_me: boolean): any {
        return this.securityService.LogIn(email, password, remember_me);
    }

    Logout() {
        this.securityService.Logoff();
    }
}
