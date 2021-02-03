import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { OmnisLocation } from '@core/models';
import { LocationService } from '@core/services/omnis';

@Injectable({
  providedIn: 'root'
})
export class LocationsResolver implements Resolve<OmnisLocation[]> {

  constructor(private locationService: LocationService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OmnisLocation[]> {
    return this.locationService.getAll();
  }
}
