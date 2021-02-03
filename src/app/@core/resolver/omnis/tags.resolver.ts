import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { OmnisTag } from '@core/models';
import { TagService } from '@core/services/omnis';

@Injectable({
  providedIn: 'root'
})
export class TagsResolver implements Resolve<OmnisTag[]> {

  constructor(private tagService: TagService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OmnisTag[]> {
    return this.tagService.getAll();
  }
}
