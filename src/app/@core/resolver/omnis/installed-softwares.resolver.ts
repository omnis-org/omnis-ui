import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { OmnisInstalledSoftware } from '@core/models';
import { InstalledSoftwareService } from '@core/services/omnis';

@Injectable({
  providedIn: 'root'
})
export class InstalledSoftwaresResolver implements Resolve<OmnisInstalledSoftware[]> {

  constructor(private installedSoftwareService: InstalledSoftwareService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OmnisInstalledSoftware[]> {
    return this.installedSoftwareService.getAll();
  }
}
