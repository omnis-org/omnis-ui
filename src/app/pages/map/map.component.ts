/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { NbSidebarService } from '@nebular/theme';
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnDestroy {

  object: any;
  typeObject: string;
  open: boolean = false;

  constructor() { }

  ngOnDestroy() { }

  getObject(obj) {
    this.object = obj;
    this.open = true;
  }

  getTypeObject(typeObj) {
    this.typeObject = typeObj;
  }

  onDelete() {
    this.open = false;
  }


}
