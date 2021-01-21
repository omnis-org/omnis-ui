/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Component, Input, OnInit } from '@angular/core';
import { ViewCell, DefaultEditor } from 'ng2-smart-table';

@Component({
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsRenderComponent implements ViewCell, OnInit {
  @Input() value: any;
  @Input() rowData: any;

  read = false;
  insert = false;
  update = false;
  delete = false;
  viewMode = true;

  ngOnInit() {
    if ((this.value & 1) === 1) {
      this.read = true;
    }

    if ((this.value >> 1 & 1) === 1) {
      this.insert = true;
    }

    if ((this.value >> 2 & 1) === 1) {
      this.update = true;
    }

    if ((this.value >> 3 & 1) === 1) {
      this.delete = true;
    }
  }

  check(event, value) { }
}

@Component({
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsEditorComponent extends DefaultEditor implements OnInit {

  read = false;
  insert = false;
  update = false;
  delete = false;
  viewMode = false;

  ngOnInit() {
    this.cell.newValue = this.cell.getValue();
    if ((this.cell.newValue & 1) === 1) {
      this.read = true;
    }

    if ((this.cell.newValue >> 1 & 1) === 1) {
      this.insert = true;
    }

    if ((this.cell.newValue >> 2 & 1) === 1) {
      this.update = true;
    }

    if ((this.cell.newValue >> 3 & 1) === 1) {
      this.delete = true;
    }
  }

  check(event, value) {
    if (event.target.checked) {
      this.cell.newValue += value;
    } else {
      this.cell.newValue -= value;
    }
  }


}

