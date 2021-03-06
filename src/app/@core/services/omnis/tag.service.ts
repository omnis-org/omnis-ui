/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Injectable } from '@angular/core';
import { OmnisTag } from '@core/models';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  public tags$: Observable<OmnisTag[]>;
  private tags_: BehaviorSubject<OmnisTag[]>;
  private refreshTimeout;

  constructor(private http: HttpClient) {
    this.tags_ = new BehaviorSubject<OmnisTag[]>(null);
    this.tags$ = this.tags_.asObservable();
  }

  public get tags(): OmnisTag[] {
    return this.tags_.value;
  }

  getAll() {
    // get all obects from api
    return this.http.get<OmnisTag[]>(`${environment.omnisRestApiUrl}/tags`)
      .pipe(tap((tags) => {
        // update behaviorSubject object everytime the getAll function is called,
        // this is what makes the real time update work
        this.refreshTimer();
        this.tags_.next(tags);
        return tags;
      })
      );
  }

  getById(id: number) {
    return this.http.get<OmnisTag>(`${environment.omnisRestApiUrl}/tag/${id}`);
  }

  update(tag: OmnisTag) {
    // update database entries using rest api
    return this.http.patch(`${environment.omnisRestApiUrl}/tag/${tag.id}`, tag)
      .pipe(tap(_ => {
        const tags = this.tags; // get current local array state
        const tagToUpdate = tags.find(m => m.id === tag.id); // find object to update
        const i = tags.indexOf(tagToUpdate);
        tags.splice(tags.indexOf(tagToUpdate), 1, tag); // update the local array
        this.tags_.next(tags); // update behaviorSubject object
      }));
  }

  insert(tag: OmnisTag) {
    // insert new entry in database using rest api
    return this.http.post<OmnisTag>(`${environment.omnisRestApiUrl}/tag`, tag)
      .pipe(tap(tag => {
        const tags = this.tags; // get current local array state
        tags.push(tag); // update the local array
        this.tags_.next(tags); // update behaviorSubject object
      }));
  }

  delete(id: string | number) {
    // delete entry in database using rest api
    return this.http.delete(`${environment.omnisRestApiUrl}/tag/${id}`)
      .pipe(tap(_ => {
        const tags = this.tags; // get current local array state
        const tagToDelete = tags.find(m => m.id === id); // find object to delete
        tags.splice(tags.indexOf(tagToDelete), 1); // delete object
        this.tags_.next(tags); // update behaviorSubject object
      }));
  }

  getOutdateds(day: number) {
    return this.http.get<OmnisTag[]>(`${environment.omnisRestApiUrl}/tags/outdated/${day}`).pipe(map(
      itemsjson => {
        var items: OmnisTag[] = [];
        itemsjson?.forEach(itemjson => {
          var item = new OmnisTag();
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
