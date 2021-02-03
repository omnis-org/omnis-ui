import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Role } from '@core/models';
import { RoleService } from '@core/services/admin';

@Injectable({
  providedIn: 'root'
})
export class RolesResolver implements Resolve<Role[]> {

  constructor(private roleService: RoleService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Role[]> {
    return this.roleService.getAll();
  }
}
