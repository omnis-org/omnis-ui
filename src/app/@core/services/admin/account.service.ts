/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { sha256 } from 'js-sha256';
import { environment } from '@environments/environment';
import { Role, User, UserToken } from '@app/@core/models/admin';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RoleService } from './role.service';
import { toInt } from '@core/utils/conversion';

const jwtHelper = new JwtHelperService();

@Injectable({ providedIn: 'root' })
export class AccountService {
    // current user
    public user$: Observable<User>; // subscribe to get current user
    private user_: BehaviorSubject<User>;
    // current token
    private userToken: UserToken;
    // current role
    public role$: Observable<Role>;
    private role_: BehaviorSubject<Role>;
    private refreshTokenTimeout;

    constructor(private router: Router, private http: HttpClient, private roleService: RoleService) {
        this.userToken = JSON.parse(localStorage.getItem('userToken'));
        // init user
        this.user_ = new BehaviorSubject<User>(jwtHelper.decodeToken<User>(this.userToken?.token));
        this.user$ = this.user_.asObservable();
        // init role
        this.role_ = new BehaviorSubject<Role>(null);
        this.role$ = this.role_.asObservable();
    }



    public get user(): User {
        return this.user_.value;
    }

    public get role(): Role {
        return this.role_.value;
    }

    public get token(): UserToken {
        return this.userToken;
    }

    /// User functions ///

    // check if first connection
    firstConnection() {
        return this.http.get<any>(`${environment.adminUrl}/first`)
            .pipe(map(res => res.result ? true : false));
    }

    login(username, password) {
        password = sha256(password);
        return this.http.post<UserToken>(`${environment.adminUrl}/login`, { username, password })
            .pipe(map(userToken => { this.processUserToken(userToken); }));
    }

    // refresh token and launch timer
    refreshToken() {
        return this.http.get<UserToken>(`${environment.adminUrl}/refresh`, { withCredentials: true })
            .pipe(map(userToken => { this.processUserToken(userToken); }));
    }


    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('userToken');
        this.userToken = null;
        this.user_.next(null);
        this.stopRefreshTokenTimer();
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        if (user.password !== '' && user.password !== null) {
            user.password = sha256(user.password);
        } else {
            user.password = null;
        }
        this.checkUserIntegrity(user);
        return this.http.post<User>(`${environment.adminUrl}/register`, user);
    }

    getAll() {
        return this.http.get<User[]>(`${environment.adminApiUrl}/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.adminApiUrl}/user/${id}`);
    }

    update(id, user: User) {
        if (user.password !== '' && user.password !== null) {
            user.password = sha256(user.password);
        } else {
            user.password = null;
        }

        this.checkUserIntegrity(user);

        return this.http.patch(`${environment.adminUrl}/update/${id}`, user)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id === this.user.id) {
                    // update local storage
                    const u = { ...this.user, ...user };
                    localStorage.setItem('user', JSON.stringify(u));

                    // publish updated user to subscribers
                    this.user_.next(u);
                }
                return x;
            }));
    }

    delete(id: number) {
        return this.http.delete(`${environment.adminApiUrl}/user/${id}`)
            .pipe(tap(_ => {
                // auto logout if the logged in user deleted their own record
                if (id === this.user.id) {
                    this.logout();
                }
            }));
    }

    private startRefreshTokenTimer() {
        const timeout = (this.userToken.expireAt - (Date.now() / 1000)) * 1000 - (60 * 1000);
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }

    private processUserToken(userToken: UserToken): User {
        this.userToken = userToken;

        localStorage.setItem('userToken', JSON.stringify(this.userToken));
        const user: User = jwtHelper.decodeToken<User>(this.userToken.token);
        this.user_.next(user);
        this.processRole();
        this.startRefreshTokenTimer();
        return user;
    }


    private checkUserIntegrity(user: User) {
        user.id = toInt(user.id);
        user.roleId = toInt(user.roleId);
    }

    private processRole() {
        this.roleService.getById(this.user?.roleId).subscribe({
            next: r => {
                const role = new Role();
                role.fromJSON(r);
                this.role_.next(role);
            },
            error: error => {
                this.role_.next(null);
                console.log(error);
            }
        });

    }


}
