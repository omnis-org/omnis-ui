/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Injectable } from '@angular/core';
import { OmnisPerimeter } from '@app/@core/models/omnis';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerimeterService {

  public perimeters$: Observable<OmnisPerimeter[]>;
  private perimeters_: BehaviorSubject<OmnisPerimeter[]>;
  private refreshTimeout;

  constructor(private http: HttpClient) {
    this.perimeters_ = new BehaviorSubject<OmnisPerimeter[]>(null);
    this.perimeters$ = this.perimeters_.asObservable();
    // when the class is first called, fetch all data from api
    this.getAll().subscribe();
  }

  public get perimeters(): OmnisPerimeter[] {
    return this.perimeters_.value;
  }

  getAll() {
    // get all obects from api
    return this.http.get<OmnisPerimeter[]>(`${environment.omnisApiUrl}/perimeters`)
      .pipe(tap((perimeters) => {
        // update behaviorSubject object everytime the getAll function is called,
        // this is what makes the real time update work
        this.refreshTimer();
        this.perimeters_.next(perimeters);
        return perimeters;
      })
      );
  }

  getById(id: number) {
    return this.http.get<OmnisPerimeter>(`${environment.omnisApiUrl}/perimeter/${id}`);
  }

  update(perimeter: OmnisPerimeter) {
    // update database entries using rest api
    return this.http.patch(`${environment.omnisApiUrl}/perimeter/${perimeter.id}`, perimeter)
      .pipe(tap(_ => {
        const perimeters = this.perimeters; // get current local array state
        const perimeterToUpdate = perimeters.find(m => m.id === perimeter.id); // find object to update
        const i = perimeters.indexOf(perimeterToUpdate);
        perimeters.splice(perimeters.indexOf(perimeterToUpdate), 1, perimeter); // update the local array
        this.perimeters_.next(perimeters); // update behaviorSubject object
      }));
  }

  insert(perimeter: OmnisPerimeter) {
    // insert new entry in database using rest api
    return this.http.post<OmnisPerimeter>(`${environment.omnisApiUrl}/perimeter`, perimeter)
      .pipe(tap(perimeter => {
        const perimeters = this.perimeters; // get current local array state
        perimeters.push(perimeter); // update the local array
        this.perimeters_.next(perimeters); // update behaviorSubject object
      }));
  }

  delete(id: string | number) {
    // delete entry in database using rest api
    return this.http.delete(`${environment.omnisApiUrl}/perimeter/${id}`)
      .pipe(tap(_ => {
        const perimeters = this.perimeters; // get current local array state
        const perimeterToDelete = perimeters.find(m => m.id === id); // find object to delete
        perimeters.splice(perimeters.indexOf(perimeterToDelete), 1); // delete object
        this.perimeters_.next(perimeters); // update behaviorSubject object
      }));
  }

  private refreshTimer() {
    this.refreshTimeout = setTimeout(() => this.getAll().subscribe(), environment.refreshDataTimeout);
  }
}
