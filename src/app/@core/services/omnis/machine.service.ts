/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */


import { Injectable } from '@angular/core';
import { OmnisMachine } from '@app/@core/models/omnis';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '@environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MachineService {
  public machines$: Observable<OmnisMachine[]>;
  private machines_: BehaviorSubject<OmnisMachine[]>;
  private refreshTimeout;


  constructor(private http: HttpClient) {
    this.machines_ = new BehaviorSubject<OmnisMachine[]>(null);
    this.machines$ = this.machines_.asObservable();
    // when the class is first called, fetch all data from api
    this.getAll().subscribe();
  }

  public get machines(): OmnisMachine[] {
    return this.machines_.value;
  }

  getAll() {
    // get all obects from api
    return this.http.get<OmnisMachine[]>(`${environment.omnisApiUrl}/machines`)
      .pipe(tap((machines) => {
        // update behaviorSubject object everytime the getAll function is called,
        // this is what makes the real time update work
        this.refreshTimer();
        this.machines_.next(machines);
        return machines;
      })
      );
  }

  getById(id: number) {
    return this.http.get<OmnisMachine>(`${environment.omnisApiUrl}/machine/${id}`);
  }

  update(machine: OmnisMachine) {
    // update database entries using rest api
    return this.http.patch(`${environment.omnisApiUrl}/machine/${machine.id}`, machine)
      .pipe(tap(_ => {
        const machines = this.machines; // get current local array state
        const machineToUpdate = machines.find(m => m.id === machine.id); // find object to update
        const i = machines.indexOf(machineToUpdate);
        machines.splice(machines.indexOf(machineToUpdate), 1, machine); // update the local array
        this.machines_.next(machines); // update behaviorSubject object
      }));
  }

  insert(machine: OmnisMachine) {
    // insert new entry in database using rest api
    return this.http.post<OmnisMachine>(`${environment.omnisApiUrl}/machine`, machine)
      .pipe(tap(machine => {
        const machines = this.machines; // get current local array state
        machines.push(machine); // update the local array
        this.machines_.next(machines); // update behaviorSubject object
      }));
  }

  delete(id: string | number) {
    // delete entry in database using rest api
    return this.http.delete(`${environment.omnisApiUrl}/machine/${id}`)
      .pipe(tap(_ => {
        const machines = this.machines; // get current local array state
        const machineToDelete = machines.find(m => m.id === id); // find object to delete
        machines.splice(machines.indexOf(machineToDelete), 1); // delete object
        this.machines_.next(machines); // update behaviorSubject object
      }));
  }


  // ADMIN

  getPendingMachines() {
    return this.http.get<OmnisMachine[]>(`${environment.adminUrl}/pending_machines/`);
  }

  authorize(id: string | number) {
    return this.http.patch<any>(`${environment.adminUrl}/pending_machine/${id}/authorize`, null);
  }

  unauthorize(id: string | number) {
    return this.http.patch<any>(`${environment.adminUrl}/pending_machine/${id}/unauthorize`, null);
  }

  private refreshTimer() {
    this.refreshTimeout = setTimeout(() => this.getAll().subscribe(), environment.refreshDataTimeout);
  }


}
