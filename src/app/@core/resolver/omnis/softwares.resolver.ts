import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { OmnisSoftware } from '@core/models';
import { SoftwareService } from '@core/services/omnis';

@Injectable({
  providedIn: 'root'
})
export class SoftwaresResolver implements Resolve<OmnisSoftware[]> {

  constructor(private softwareService: SoftwareService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OmnisSoftware[]> {
    return this.softwareService.getAll();
  }
}
