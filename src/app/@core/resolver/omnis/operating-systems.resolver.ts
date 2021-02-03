import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { OmnisOperatingSystem } from '@core/models';
import { OperatingSystemService } from '@core/services/omnis';

@Injectable({
  providedIn: 'root'
})
export class OperatingSystemsResolver implements Resolve<OmnisOperatingSystem[]> {

  constructor(private operatingSystemService: OperatingSystemService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OmnisOperatingSystem[]> {
    return this.operatingSystemService.getAll();
  }
}
