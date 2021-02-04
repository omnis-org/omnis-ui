/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Injectable } from '@angular/core';
import { OmnisInterface } from '@core/models';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterfaceService {
  public interfaces$: Observable<OmnisInterface[]>;
  private interfaces_: BehaviorSubject<OmnisInterface[]>;
  private refreshTimeout;

  constructor(private http: HttpClient) {
    this.interfaces_ = new BehaviorSubject<OmnisInterface[]>(null);
    this.interfaces$ = this.interfaces_.asObservable();
    this.getAll().subscribe(); // when the class is first called, fetch all data from api
  }

  public get interfaces(): OmnisInterface[] {
    return this.interfaces_.value;
  }

  getAll() {
    // get all obects from api
    return this.http.get<OmnisInterface[]>(`${environment.omnisApiUrl}/interfaces`)
      .pipe(tap((interfaces) => {
        this.refreshTimer();
        this.interfaces_.next(interfaces);
        return interfaces;
      })
      );
  }

  getById(id: number) {
    return this.http.get<OmnisInterface>(`${environment.omnisApiUrl}/interface/${id}`);
  }

  update(itf: OmnisInterface) {
    // update database entries using rest api
    return this.http.patch(`${environment.omnisApiUrl}/interface/${itf.id}`, itf)
      .pipe(tap(_ => {
        const interfaces = this.interfaces; // get current local array state
        const interfaceToUpdate = interfaces.find(m => m.id === itf.id); // find object to update
        const i = interfaces.indexOf(interfaceToUpdate);
        interfaces.splice(interfaces.indexOf(interfaceToUpdate), 1, itf); // update the local array
        this.interfaces_.next(interfaces); // update behaviorSubject object
      }));
  }

  insert(itf: OmnisInterface) {
    // insert new entry in database using rest api
    return this.http.post<OmnisInterface>(`${environment.omnisApiUrl}/interface`, itf)
      .pipe(tap(itf => {
        const interfaces = this.interfaces; // get current local array state
        interfaces.push(itf); // update the local array
        this.interfaces_.next(interfaces); // update behaviorSubject object
      }));
  }

  delete(id: string | number) {
    // delete entry in database using rest api
    return this.http.delete(`${environment.omnisApiUrl}/interface/${id}`)
      .pipe(tap(_ => {
        const interfaces = this.interfaces; // get current local array state
        const interfaceToDelete = interfaces.find(m => m.id === id); // find object to delete
        interfaces.splice(interfaces.indexOf(interfaceToDelete), 1); // delete object
        this.interfaces_.next(interfaces); // update behaviorSubject object
      }));
  }

  getOutdateds(day: number) {
    return this.http.get<OmnisInterface[]>(`${environment.omnisApiUrl}/interfaces/outdated/${day}`).pipe(map(
      itemsjson => {
        var items: OmnisInterface[] = [];
        itemsjson?.forEach(itemjson => {
          var item = new OmnisInterface();
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
