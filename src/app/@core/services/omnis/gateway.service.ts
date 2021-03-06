/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Injectable } from '@angular/core';
import { OmnisGateway } from '@core/models';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {
  public gateways$: Observable<OmnisGateway[]>;
  private gateways_: BehaviorSubject<OmnisGateway[]>;
  private refreshTimeout;

  constructor(private http: HttpClient) {
    this.gateways_ = new BehaviorSubject<OmnisGateway[]>(null);
    this.gateways$ = this.gateways_.asObservable();
  }

  public get gateways(): OmnisGateway[] {
    return this.gateways_.value;
  }

  getAll() {
    // get all obects from api
    return this.http.get<OmnisGateway[]>(`${environment.omnisRestApiUrl}/gateways`)
      .pipe(tap((gateways) => {
        // update behaviorSubject object everytime the getAll function is called,
        // this is what makes the real time update work
        this.refreshTimer();
        this.gateways_.next(gateways);
        return gateways;
      })
      );
  }

  getById(id: number) {
    return this.http.get<OmnisGateway>(`${environment.omnisRestApiUrl}/gateway/${id}`);
  }

  update(gtw: OmnisGateway) {
    // update database entries using rest api
    return this.http.patch(`${environment.omnisRestApiUrl}/gateway/${gtw.id}`, gtw)
      .pipe(tap(_ => {
        const gateways = this.gateways; // get current local array state
        const gatewayToUpdate = gateways.find(m => m.id === gtw.id); // find object to update
        const i = gateways.indexOf(gatewayToUpdate);
        gateways.splice(gateways.indexOf(gatewayToUpdate), 1, gtw); // update the local array
        this.gateways_.next(gateways); // update behaviorSubject object
      }));
  }

  insert(gtw: OmnisGateway) {
    // insert new entry in database using rest api
    return this.http.post<OmnisGateway>(`${environment.omnisRestApiUrl}/gateway`, gtw)
      .pipe(tap(gtw => {
        const gateways = this.gateways; // get current local array state
        gateways.push(gtw); // update the local array
        this.gateways_.next(gateways); // update behaviorSubject object
      }));
  }

  delete(id: string | number) {
    // delete entry in database using rest api
    return this.http.delete(`${environment.omnisRestApiUrl}/gateway/${id}`)
      .pipe(tap(_ => {
        const gateways = this.gateways; // get current local array state
        const gatewayToDelete = gateways.find(m => m.id === id); // find object to delete
        gateways.splice(gateways.indexOf(gatewayToDelete), 1); // delete object
        this.gateways_.next(gateways); // update behaviorSubject object
      }));
  }

  getOutdateds(day: number) {
    return this.http.get<OmnisGateway[]>(`${environment.omnisRestApiUrl}/gateways/outdated/${day}`).pipe(map(
      itemsjson => {
        var items: OmnisGateway[] = [];
        itemsjson?.forEach(itemjson => {
          var item = new OmnisGateway();
          item.fromJSON(itemjson);
          items.push(item);
        })
        return items;
      }
    ));
  }

  private refreshTimer() {
    this.refreshTimeout = setTimeout(() => this.getAll().subscribe(), environment.refreshDataTimeout);
  }
}
