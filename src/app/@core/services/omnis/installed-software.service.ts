/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Injectable } from '@angular/core';
import { OmnisInstalledSoftware } from '@core/models';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstalledSoftwareService {
  public installedSoftwares$: Observable<OmnisInstalledSoftware[]>;
  private installedSoftwares_: BehaviorSubject<OmnisInstalledSoftware[]>;
  private refreshTimeout;

  constructor(private http: HttpClient) {
    this.installedSoftwares_ = new BehaviorSubject<OmnisInstalledSoftware[]>(null);
    this.installedSoftwares$ = this.installedSoftwares_.asObservable();
  }

  public get installedSoftwares(): OmnisInstalledSoftware[] {
    return this.installedSoftwares_.value;
  }

  getAll() {
    // get all obects from api
    return this.http.get<OmnisInstalledSoftware[]>(`${environment.omnisApiUrl}/installedSoftwares`)
      .pipe(tap((installedSoftwares) => {
        // update behaviorSubject object everytime the getAll function is called,
        // this is what makes the real time update work
        this.refreshTimer();
        this.installedSoftwares_.next(installedSoftwares);
        return installedSoftwares;
      })
      );
  }

  getById(id: number) {
    return this.http.get<OmnisInstalledSoftware>(`${environment.omnisApiUrl}/installedSoftware/${id}`);
  }

  update(installedSoftware: OmnisInstalledSoftware) {
    // update database entries using rest api
    return this.http.patch(`${environment.omnisApiUrl}/installedSoftware/${installedSoftware.id}`, installedSoftware)
      .pipe(tap(_ => {
        const installedSoftwares = this.installedSoftwares; // get current local array state
        const installedSoftwareToUpdate = installedSoftwares.find(m => m.id === installedSoftware.id); // find object to update
        const i = installedSoftwares.indexOf(installedSoftwareToUpdate);
        installedSoftwares.splice(installedSoftwares.indexOf(installedSoftwareToUpdate), 1, installedSoftware); // update the local array
        this.installedSoftwares_.next(installedSoftwares); // update behaviorSubject object
      }));
  }

  insert(installedSoftware: OmnisInstalledSoftware) {
    // insert new entry in database using rest api
    return this.http.post<OmnisInstalledSoftware>(`${environment.omnisApiUrl}/installedSoftware`, installedSoftware)
      .pipe(tap(installedSoftware => {
        const installedSoftwares = this.installedSoftwares; // get current local array state
        installedSoftwares.push(installedSoftware); // update the local array
        this.installedSoftwares_.next(installedSoftwares); // update behaviorSubject object
      }));
  }

  delete(id: string | number) {
    // delete entry in database using rest api
    return this.http.delete(`${environment.omnisApiUrl}/installedSoftware/${id}`)
      .pipe(tap(_ => {
        const installedSoftwares = this.installedSoftwares; // get current local array state
        const installedSoftwareToDelete = installedSoftwares.find(m => m.id === id); // find object to delete
        installedSoftwares.splice(installedSoftwares.indexOf(installedSoftwareToDelete), 1); // delete object
        this.installedSoftwares_.next(installedSoftwares); // update behaviorSubject object
      }));
  }

  getOutdateds(day: number) {
    return this.http.get<OmnisInstalledSoftware[]>(`${environment.omnisApiUrl}/installedSoftwares/outdated/${day}`).pipe(map(
      itemsjson => {
        var items: OmnisInstalledSoftware[] = [];
        itemsjson?.forEach(itemjson => {
          var item = new OmnisInstalledSoftware();
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
