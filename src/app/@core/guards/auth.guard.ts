/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, UrlSegment } from '@angular/router';

import { AccountService } from '@core/services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) { }

    checkAuth() {
        const user = this.accountService.user;
        if (user) {
            return true;
        }
        this.router.navigate(['/auth/login']);
        return false;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.checkAuth();
    }

    canLoad(route: Route, segments: UrlSegment[]) {
        return this.checkAuth();
    }
}
