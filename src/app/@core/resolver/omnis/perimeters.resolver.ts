import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { OmnisPerimeter } from '@core/models';
import { PerimeterService } from '@core/services/omnis';

@Injectable({
  providedIn: 'root'
})
export class PerimetersResolver implements Resolve<OmnisPerimeter[]> {

  constructor(private perimeterService: PerimeterService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OmnisPerimeter[]> {
    return this.perimeterService.getAll();
  }
}
