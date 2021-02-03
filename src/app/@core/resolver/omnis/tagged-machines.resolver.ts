import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { OmnisTaggedMachine } from '@core/models';
import { TaggedMachineService } from '@core/services/omnis';

@Injectable({
  providedIn: 'root'
})
export class TaggedMachinesResolver implements Resolve<OmnisTaggedMachine[]> {

  constructor(private taggedMachineService: TaggedMachineService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OmnisTaggedMachine[]> {
    return this.taggedMachineService.getAll();
  }
}
