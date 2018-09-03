import { SecurityService } from './../services/security.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private securityService: SecurityService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        // const token = this.securityService.GetToken();
        // if (token) {
        //     request = request.clone({
        //         setHeaders: {
        //             Authorization: 'Bearer ' + token
        //         }
        //     });
        // }

        return next.handle(request);
    }
}