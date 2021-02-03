/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Injectable } from '@angular/core';
import { Role } from '@app/@core/models/admin';
import { HttpClient } from '@angular/common/http';
import { toInt } from '@core/utils/conversion';
import { environment } from '@environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  public roles$: Observable<Role[]>;
  private roles_: BehaviorSubject<Role[]>;
  private refreshTimeout;

  constructor(private http: HttpClient) {
    this.roles_ = new BehaviorSubject<Role[]>(null);
    this.roles$ = this.roles_.asObservable();
  }

  public get roles(): Role[] {
    return this.roles_.value;
  }


  getAll() {
    return this.http.get<Role[]>(`${environment.adminApiUrl}/roles`)
      .pipe(tap((roles) => {
        this.roles_.next(roles);
        return roles;
      })
      );
  }

  getById(id: number | string): Observable<Role> {
    return this.http.get<any>(`${environment.adminApiUrl}/role/${id}`);
  }

  update(role: Role) {
    this.checkRoleIntegrity(role);
    return this.http.patch(`${environment.adminApiUrl}/role/${role.id}`, role)
      .pipe(tap(_ => {
        const roles = this.roles;
        const roleToUpdate = roles.find(m => m.id === role.id);
        const i = roles.indexOf(roleToUpdate);
        roles.splice(roles.indexOf(roleToUpdate), 1, role);
        this.roles_.next(roles);
      }));
  }

  insert(role: Role) {
    this.checkRoleIntegrity(role);
    return this.http.post<Role>(`${environment.adminApiUrl}/role`, role)
      .pipe(tap(gtw => {
        const roles = this.roles;
        roles.push(gtw);
        this.roles_.next(roles);
      }));
  }

  delete(id: string | number) {
    return this.http.delete(`${environment.adminApiUrl}/role/${id}`)
      .pipe(tap(_ => {
        const roles = this.roles;
        const roleToDelete = roles.find(m => m.id === id);
        roles.splice(roles.indexOf(roleToDelete), 1);
        this.roles_.next(roles);
      }));
  }

  private checkRoleIntegrity(role: Role) {
    role.id = toInt(role.id);
    role.omnisPermissions = toInt(role.omnisPermissions);
    role.rolesPermissions = toInt(role.rolesPermissions);
    role.usersPermissions = toInt(role.usersPermissions);
    role.pendingMachinesPermissions = toInt(role.pendingMachinesPermissions);
  }

}
