/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Injectable } from '@angular/core';
import { OmnisLocation } from '@core/models';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  public locations$: Observable<OmnisLocation[]>;
  private locations_: BehaviorSubject<OmnisLocation[]>;
  private refreshTimeout;

  constructor(private http: HttpClient) {
    this.locations_ = new BehaviorSubject<OmnisLocation[]>(null);
    this.locations$ = this.locations_.asObservable();
    // when the class is first called, fetch all data from api
    this.getAll().subscribe();
  }

  public get locations(): OmnisLocation[] {
    return this.locations_.value;
  }

  getAll() {
    // get all obects from api
    return this.http.get<OmnisLocation[]>(`${environment.omnisApiUrl}/locations`)
      .pipe(tap((locations) => {
        // update behaviorSubject object everytime the getAll function is called,
        // this is what makes the real time update work
        this.refreshTimer();
        this.locations_.next(locations);
        return locations;
      })
      );
  }

  getById(id: number) {
    return this.http.get<OmnisLocation>(`${environment.omnisApiUrl}/location/${id}`);
  }

  update(location: OmnisLocation) {
    // update database entries using rest api
    return this.http.patch(`${environment.omnisApiUrl}/location/${location.id}`, location)
      .pipe(tap(_ => {
        const locations = this.locations; // get current local array state
        const locationToUpdate = locations.find(m => m.id === location.id); // find object to update
        const i = locations.indexOf(locationToUpdate);
        locations.splice(locations.indexOf(locationToUpdate), 1, location); // update the local array
        this.locations_.next(locations); // update behaviorSubject object
      }));
  }

  insert(location: OmnisLocation) {
    // insert new entry in database using rest api
    return this.http.post<OmnisLocation>(`${environment.omnisApiUrl}/location`, location)
      .pipe(tap(location => {
        const locations = this.locations; // get current local array state
        locations.push(location); // update the local array
        this.locations_.next(locations); // update behaviorSubject object
      }));
  }

  delete(id: string | number) {
    // delete entry in database using rest api
    return this.http.delete(`${environment.omnisApiUrl}/location/${id}`)
      .pipe(tap(_ => {
        const locations = this.locations; // get current local array state
        const locationToDelete = locations.find(m => m.id === id); // find object to delete
        locations.splice(locations.indexOf(locationToDelete), 1); // delete object
        this.locations_.next(locations); // update behaviorSubject object
      }));
  }

  getOutdateds(day: number) {
    return this.http.get<OmnisLocation[]>(`${environment.omnisApiUrl}/locations/outdated/${day}`);
  }

  private refreshTimer() {
    this.refreshTimeout = setTimeout(() => this.getAll().subscribe(), environment.refreshDataTimeout);
  }
}
