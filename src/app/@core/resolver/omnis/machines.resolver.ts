import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { OmnisMachine } from '@core/models';
import { Observable, of } from 'rxjs';
import { MachineService } from '@core/services/omnis';

@Injectable({
  providedIn: 'root'
})
export class MachinesResolver implements Resolve<OmnisMachine[]> {

  constructor(private machineService: MachineService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OmnisMachine[]> {
    return this.machineService.getAll();
  }
}
