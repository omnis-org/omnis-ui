import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { OmnisInterface } from '@core/models';
import { InterfaceService } from '@core/services/omnis';

@Injectable({
  providedIn: 'root'
})
export class InterfacesResolver implements Resolve<OmnisInterface[]> {

  constructor(private interfaceService: InterfaceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OmnisInterface[]> {
    return this.interfaceService.getAll();
  }
}
