/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Injectable } from '@angular/core';
import { OmnisTaggedMachine } from '@core/models';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaggedMachineService {
  public taggedMachines$: Observable<OmnisTaggedMachine[]>;
  private taggedMachines_: BehaviorSubject<OmnisTaggedMachine[]>;
  private refreshTimeout;

  constructor(private http: HttpClient) {
    this.taggedMachines_ = new BehaviorSubject<OmnisTaggedMachine[]>(null);
    this.taggedMachines$ = this.taggedMachines_.asObservable();
    this.getAll().subscribe(); // when the class is first called, fetch all data from api
  }

  public get taggedMachines(): OmnisTaggedMachine[] {
    return this.taggedMachines_.value;
  }

  getAll() {
    // get all obects from api
    return this.http.get<OmnisTaggedMachine[]>(`${environment.omnisApiUrl}/taggedMachines`)
      .pipe(tap((taggedMachines) => {
        // update behaviorSubject object everytime the getAll function is called,
        // this is what makes the real time update work
        this.refreshTimer();
        this.taggedMachines_.next(taggedMachines);
        return taggedMachines;
      })
      );
  }

  getById(id: number) {
    return this.http.get<OmnisTaggedMachine>(`${environment.omnisApiUrl}/taggedMachine/${id}`);
  }

  update(taggedMachine: OmnisTaggedMachine) {
    // update database entries using rest api
    return this.http.patch(`${environment.omnisApiUrl}/taggedMachine/${taggedMachine.id}`, taggedMachine)
      .pipe(tap(_ => {
        const taggedMachines = this.taggedMachines; // get current local array state
        const taggedMachineToUpdate = taggedMachines.find(m => m.id === taggedMachine.id); // find object to update
        const i = taggedMachines.indexOf(taggedMachineToUpdate);
        taggedMachines.splice(taggedMachines.indexOf(taggedMachineToUpdate), 1, taggedMachine); // update the local array
        this.taggedMachines_.next(taggedMachines); // update behaviorSubject object
      }));
  }

  insert(taggedMachine: OmnisTaggedMachine) {
    // insert new entry in database using rest api
    return this.http.post<OmnisTaggedMachine>(`${environment.omnisApiUrl}/taggedMachine`, taggedMachine)
      .pipe(tap(taggedMachine => {
        const taggedMachines = this.taggedMachines; // get current local array state
        taggedMachines.push(taggedMachine); // update the local array
        this.taggedMachines_.next(taggedMachines); // update behaviorSubject object
      }));
  }

  delete(id: string | number) {
    // delete entry in database using rest api
    return this.http.delete(`${environment.omnisApiUrl}/taggedMachine/${id}`)
      .pipe(tap(_ => {
        const taggedMachines = this.taggedMachines; // get current local array state
        const taggedMachineToDelete = taggedMachines.find(m => m.id === id); // find object to delete
        taggedMachines.splice(taggedMachines.indexOf(taggedMachineToDelete), 1); // delete object
        this.taggedMachines_.next(taggedMachines); // update behaviorSubject object
      }));
  }

  getOutdateds(day: number) {
    return this.http.get<OmnisTaggedMachine[]>(`${environment.omnisApiUrl}/taggedMachines/outdated/${day}`);
  }

  private refreshTimer() {
    this.refreshTimeout = setTimeout(() => this.getAll().subscribe(), environment.refreshDataTimeout);
  }
}
