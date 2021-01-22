/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Injectable } from '@angular/core';
import { OmnisNetwork } from '@app/@core/models/omnis';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  public networks$: Observable<OmnisNetwork[]>;
  private networks_: BehaviorSubject<OmnisNetwork[]>;
  private refreshTimeout;

  constructor(private http: HttpClient) {
    this.networks_ = new BehaviorSubject<OmnisNetwork[]>(null);
    this.networks$ = this.networks_.asObservable();
    // when the class is first called, fetch all data from api
    this.getAll().subscribe();
  }

  public get networks(): OmnisNetwork[] {
    return this.networks_.value;
  }

  getAll() {
    // get all obects from api
    return this.http.get<OmnisNetwork[]>(`${environment.omnisApiUrl}/networks`)
      .pipe(tap((networks) => {
        // update behaviorSubject object everytime the getAll function is called,
        // this is what makes the real time update work
        this.refreshTimer();
        this.networks_.next(networks);
        return networks;
      })
      );
  }

  getById(id: number) {
    return this.http.get<OmnisNetwork>(`${environment.omnisApiUrl}/network/${id}`);
  }

  update(network: OmnisNetwork) {
    // update database entries using rest api
    return this.http.patch(`${environment.omnisApiUrl}/network/${network.id}`, network)
      .pipe(tap(_ => {
        const networks = this.networks; // get current local array state
        const networkToUpdate = networks.find(m => m.id === network.id); // find object to update
        const i = networks.indexOf(networkToUpdate);
        networks.splice(networks.indexOf(networkToUpdate), 1, network); // update the local array
        this.networks_.next(networks); // update behaviorSubject object
      }));
  }

  insert(network: OmnisNetwork) {
    // insert new entry in database using rest api
    return this.http.post<OmnisNetwork>(`${environment.omnisApiUrl}/network`, network)
      .pipe(tap(network => {
        const networks = this.networks; // get current local array state
        networks.push(network); // update the local array
        this.networks_.next(networks); // update behaviorSubject object
      }));
  }

  delete(id: string | number) {
    // delete entry in database using rest api
    return this.http.delete(`${environment.omnisApiUrl}/network/${id}`)
      .pipe(tap(_ => {
        const networks = this.networks; // get current local array state
        const networkToDelete = networks.find(m => m.id === id); // find object to delete
        networks.splice(networks.indexOf(networkToDelete), 1); // delete object
        this.networks_.next(networks); // update behaviorSubject object
      }));
  }

  private refreshTimer() {
    this.refreshTimeout = setTimeout(() => this.getAll().subscribe(), environment.refreshDataTimeout);
  }
}
