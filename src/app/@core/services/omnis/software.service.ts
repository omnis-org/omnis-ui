/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Injectable } from '@angular/core';
import { OmnisSoftware } from '@core/models';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SoftwareService {
  public softwares$: Observable<OmnisSoftware[]>;
  private softwares_: BehaviorSubject<OmnisSoftware[]>;
  private refreshTimeout;

  constructor(private http: HttpClient) {
    this.softwares_ = new BehaviorSubject<OmnisSoftware[]>(null);
    this.softwares$ = this.softwares_.asObservable();
  }

  public get softwares(): OmnisSoftware[] {
    return this.softwares_.value;
  }

  getAll() {
    // get all obects from api
    return this.http.get<OmnisSoftware[]>(`${environment.omnisApiUrl}/softwares`)
      .pipe(tap((softwares) => {
        // update behaviorSubject object everytime the getAll function is called,
        // this is what makes the real time update work
        this.refreshTimer();
        this.softwares_.next(softwares);
        return softwares;
      })
      );
  }

  getById(id: number) {
    return this.http.get<OmnisSoftware>(`${environment.omnisApiUrl}/software/${id}`);
  }

  update(software: OmnisSoftware) {
    // update database entries using rest api
    return this.http.patch(`${environment.omnisApiUrl}/software/${software.id}`, software)
      .pipe(tap(_ => {
        const softwares = this.softwares; // get current local array state
        const softwareToUpdate = softwares.find(m => m.id === software.id); // find object to update
        const i = softwares.indexOf(softwareToUpdate);
        softwares.splice(softwares.indexOf(softwareToUpdate), 1, software); // update the local array
        this.softwares_.next(softwares); // update behaviorSubject object
      }));
  }

  insert(software: OmnisSoftware) {
    // insert new entry in database using rest api
    return this.http.post<OmnisSoftware>(`${environment.omnisApiUrl}/software`, software)
      .pipe(tap(software => {
        const softwares = this.softwares; // get current local array state
        softwares.push(software); // update the local array
        this.softwares_.next(softwares); // update behaviorSubject object
      }));
  }

  delete(id: string | number) {
    // delete entry in database using rest api
    return this.http.delete(`${environment.omnisApiUrl}/software/${id}`)
      .pipe(tap(_ => {
        const softwares = this.softwares; // get current local array state
        const softwareToDelete = softwares.find(m => m.id === id); // find object to delete
        softwares.splice(softwares.indexOf(softwareToDelete), 1); // delete object
        this.softwares_.next(softwares); // update behaviorSubject object
      }));
  }

  getOutdateds(day: number) {
    return this.http.get<OmnisSoftware[]>(`${environment.omnisApiUrl}/softwares/outdated/${day}`).pipe(map(
      itemsjson => {
        var items: OmnisSoftware[] = [];
        itemsjson?.forEach(itemjson => {
          var item = new OmnisSoftware();
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
