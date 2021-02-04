/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Injectable } from '@angular/core';
import { OmnisOperatingSystem } from '@core/models';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperatingSystemService {
  public operatingSystems$: Observable<OmnisOperatingSystem[]>;
  private operatingSystems_: BehaviorSubject<OmnisOperatingSystem[]>;
  private refreshTimeout;

  constructor(private http: HttpClient) {
    this.operatingSystems_ = new BehaviorSubject<OmnisOperatingSystem[]>(null);
    this.operatingSystems$ = this.operatingSystems_.asObservable();
  }

  public get operatingSystems(): OmnisOperatingSystem[] {
    return this.operatingSystems_.value;
  }

  getAll() {
    // get all obects from api
    return this.http.get<OmnisOperatingSystem[]>(`${environment.omnisRestApiUrl}/operatingSystems`)
      .pipe(tap((operatingSystems) => {
        // update behaviorSubject object everytime the getAll function is called,
        // this is what makes the real time update work
        this.refreshTimer();
        this.operatingSystems_.next(operatingSystems);
        return operatingSystems;
      })
      );
  }

  getById(id: number) {
    return this.http.get<OmnisOperatingSystem>(`${environment.omnisRestApiUrl}/operatingSystem/${id}`);
  }

  update(operatingSystem: OmnisOperatingSystem) {
    // update database entries using rest api
    return this.http.patch(`${environment.omnisRestApiUrl}/operatingSystem/${operatingSystem.id}`, operatingSystem)
      .pipe(tap(_ => {
        const operatingSystems = this.operatingSystems; // get current local array state
        const operatingSystemToUpdate = operatingSystems.find(m => m.id === operatingSystem.id); // find object to update
        const i = operatingSystems.indexOf(operatingSystemToUpdate);
        operatingSystems.splice(operatingSystems.indexOf(operatingSystemToUpdate), 1, operatingSystem); // update the local array
        this.operatingSystems_.next(operatingSystems); // update behaviorSubject object
      }));
  }

  insert(operatingSystem: OmnisOperatingSystem) {
    // insert new entry in database using rest api
    return this.http.post<OmnisOperatingSystem>(`${environment.omnisRestApiUrl}/operatingSystem`, operatingSystem)
      .pipe(tap(operatingSystem => {
        const operatingSystems = this.operatingSystems; // get current local array state
        operatingSystems.push(operatingSystem); // update the local array
        this.operatingSystems_.next(operatingSystems); // update behaviorSubject object
      }));
  }

  delete(id: string | number) {
    // delete entry in database using rest api
    return this.http.delete(`${environment.omnisRestApiUrl}/operatingSystem/${id}`)
      .pipe(tap(_ => {
        const operatingSystems = this.operatingSystems; // get current local array state
        const operatingSystemToDelete = operatingSystems.find(m => m.id === id); // find object to delete
        operatingSystems.splice(operatingSystems.indexOf(operatingSystemToDelete), 1); // delete object
        this.operatingSystems_.next(operatingSystems); // update behaviorSubject object
      }));
  }

  getOutdateds(day: number) {
    return this.http.get<OmnisOperatingSystem[]>(`${environment.omnisRestApiUrl}/operatingSystems/outdated/${day}`).pipe(map(
      itemsjson => {
        var items: OmnisOperatingSystem[] = [];
        itemsjson?.forEach(itemjson => {
          var item = new OmnisOperatingSystem();
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
