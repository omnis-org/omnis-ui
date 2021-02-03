import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { OmnisNetwork } from '@core/models';
import { NetworkService } from '@core/services/omnis';

@Injectable({
  providedIn: 'root'
})
export class NetworksResolver implements Resolve<OmnisNetwork[]> {

  constructor(private networkService: NetworkService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OmnisNetwork[]> {
    return this.networkService.getAll();
  }
}
