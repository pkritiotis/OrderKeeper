import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, RequestMethod, Headers } from '@angular/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { SecurityService } from './security.service';
import { Guid } from '../../../guid';

@Injectable()
export class DataService {
    constructor(private http: HttpClient, private securityService: SecurityService) { }

    get(url: string, params?: any): Observable<any> {
        const options: RequestOptionsArgs = {};

        // if (this.securityService) {
        //     options.headers = new Headers();
        //     options.headers.append('Authorization', 'Bearer ' + this.securityService.GetToken());
        // }

        return this.http.get<any>(url).map(
            (res: Response) => {
            return res;
        }).catch(this.handleError);
    }

    postWithId(url: string, data: any, params?: any): Observable<Response> {
        return this.doPost(url, data, true, params);
    }

    post(url: string, data: any, params?: any): Observable<Response> {
        return this.doPost(url, data, false, params);
    }

    putWithId(url: string, data: any, params?: any): Observable<Response> {
        return this.doPut(url, data, true, params);
    }

    private doPost(url: string, data: any, needId: boolean, params?: any): Observable<Response> {
        const options: RequestOptionsArgs = {};

        options.headers = new Headers();
        if (this.securityService) {
            options.headers.append('Authorization', 'Bearer ' + this.securityService.GetToken());
        }
        if (needId) {
            const guid = Guid.newGuid();
            options.headers.append('x-requestid', guid);
        }

        return this.http.post(url, data).map(
            (res: Response) => {
                return res;
            }).catch(this.handleError);
    }

    private doPut(url: string, data: any, needId: boolean, params?: any): Observable<Response> {
        const options: RequestOptionsArgs = {};

        options.headers = new Headers();
        if (needId) {
            const guid = Guid.newGuid();
            options.headers.append('x-requestid', guid);
        }

        return this.http.put(url, data).map(
            (res: Response) => {
                return res;
            }).catch(this.handleError);
    }

    delete(url: string, params?: any) {
        const options: RequestOptionsArgs = {};

        if (this.securityService) {
            options.headers = new Headers();
            options.headers.append('Authorization', 'Bearer ' + this.securityService.GetToken());
        }

        console.log('data.service deleting');
        this.http.delete(url).subscribe((res) => {
            console.log('deleted');
        });
    }

    private handleError(error: any) {
        console.error('server error:', error);
        if (error instanceof Response) {
            let errMessage = '';
            try {
                errMessage = error.json();
            } catch (err) {
                errMessage = error.statusText;
            }
            return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'server error');
    }
}
