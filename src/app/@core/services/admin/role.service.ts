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

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Role[]>(`${environment.adminApiUrl}/roles`);
  }

  getById(id: number | string): Observable<Role> {
    return this.http.get<any>(`${environment.adminApiUrl}/role/${id}`);
  }

  update(role: Role) {
    this.checkRoleIntegrity(role);
    return this.http.patch(`${environment.adminApiUrl}/role/${role.id}`, role);
  }

  insert(role: Role) {
    this.checkRoleIntegrity(role);
    return this.http.post<Role>(`${environment.adminApiUrl}/role`, role);
  }

  delete(id: string | number) {
    return this.http.delete(`${environment.adminApiUrl}/role/${id}`);
  }

  private checkRoleIntegrity(role: Role) {
    role.id = toInt(role.id);
    role.omnisPermissions = toInt(role.omnisPermissions);
    role.rolesPermissions = toInt(role.rolesPermissions);
    role.usersPermissions = toInt(role.usersPermissions);
    role.pendingMachinesPermissions = toInt(role.pendingMachinesPermissions);
  }

}
