/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { AccountService } from '@core/services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const userToken = this.accountService.token;
        const isLoggedIn = userToken && userToken.token;
        const isServerUrl = request.url.startsWith(environment.omnisRestApiUrl) ||
            request.url.startsWith(environment.adminRestApiUrl) ||
            request.url.startsWith(environment.adminApiUrl);



        if (isServerUrl) {
            let headers = new HttpHeaders({
                'Content-Type': `application/json`
            });

            if (isLoggedIn) {
                headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken.token}`
                });

            }

            request = request.clone({ headers });
        }



        return next.handle(request);
    }
}
