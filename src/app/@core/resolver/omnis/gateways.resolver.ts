import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { OmnisGateway } from '@core/models';
import { GatewayService } from '@core/services/omnis';

@Injectable({
  providedIn: 'root'
})
export class GatewaysResolver implements Resolve<OmnisGateway[]> {

  constructor(private gatewayService: GatewayService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OmnisGateway[]> {
    return this.gatewayService.getAll();
  }
}
