/**
 * OrderKeeper Customer Management API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs/Observable';

import { Customer } from '../model/customer';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class CustomerService {

    protected basePath = 'http://localhost:58882';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (let consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * 
     * 
     * @param customerId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiCustomerByCustomerIdGet(customerId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiCustomerByCustomerIdGet(customerId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiCustomerByCustomerIdGet(customerId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiCustomerByCustomerIdGet(customerId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (customerId === null || customerId === undefined) {
            throw new Error('Required parameter customerId was null or undefined when calling apiCustomerByCustomerIdGet.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/api/Customer/${encodeURIComponent(String(customerId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param customerId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiCustomerDelete(customerId?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiCustomerDelete(customerId?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiCustomerDelete(customerId?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiCustomerDelete(customerId?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (customerId !== undefined) {
            queryParameters = queryParameters.set('CustomerId', <any>customerId);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        return this.httpClient.delete<any>(`${this.basePath}/api/Customer`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiCustomerGet(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiCustomerGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiCustomerGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiCustomerGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        
        let headers = this.defaultHeaders;
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }
        headers = headers.set("Authorization","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwa3JpdGlvdGlzQGdtYWlsLmNvbSIsImp0aSI6ImFkYTU1YzEzLTNjNWMtNDk5Zi04NTAwLTNhZGVmMmM2MWQ0MiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiNTY5N2I0MmYtZGYzNi00ZGI5LWIxNzUtNjRlYjJiNGQ3OGQ4IiwiZXhwIjoxNTM3ODk1Nzk4LCJpc3MiOiJodHRwOi8vaWRlbnRpdHkub3JkZXJrZWVwZXIucGtyaXRpb3Rpcy5naXRodWIuY29tIiwiYXVkIjoiaHR0cDovL2lkZW50aXR5Lm9yZGVya2VlcGVyLnBrcml0aW90aXMuZ2l0aHViLmNvbSJ9.sC5gPuyLaSfSVZo2_yzshS6_cVpTj6-JsjaiCXNwAKY")

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/api/Customer`,
            {
                // withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param customer 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiCustomerPost(customer?: Customer, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiCustomerPost(customer?: Customer, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiCustomerPost(customer?: Customer, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiCustomerPost(customer?: Customer, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json-patch+json',
            'application/json',
            'text/json',
            'application/_*+json'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.post<any>(`${this.basePath}/api/Customer`,
            customer,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param customer 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiCustomerPut(customer?: Customer, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiCustomerPut(customer?: Customer, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiCustomerPut(customer?: Customer, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiCustomerPut(customer?: Customer, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json-patch+json',
            'application/json',
            'text/json',
            'application/_*+json'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.put<any>(`${this.basePath}/api/Customer`,
            customer,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
