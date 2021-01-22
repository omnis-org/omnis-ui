/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';

@Component({
    template: `
    <input [ngClass]="inputClass"
            #password
            type="password"
            class="form-control short-input"
            placeholder=""
            [name]="cell.getId()"
            [disabled]="!cell.isEditable()"
            [placeholder]="placeholderValue"
            (click)="onClick.emit($event)"
            (keyup)="updateValue()"
            (keydown.enter)="onEdited.emit($event)"
            (keydown.esc)="onStopEditing.emit()">
  `,
})
export class PasswordEditorComponent extends DefaultEditor {

    @ViewChild('password') password: ElementRef;

    placeholderValue: string;

    constructor() {
        super();
    }

    ngOnInit() {
        console.log(this.cell.getRow());
        this.cell.newValue = '';
        if (this.cell.getRow().index == -1) {
            this.placeholderValue = 'Password';
        } else {
            this.placeholderValue = 'No change';
        }
    }

    updateValue() {
        this.cell.newValue = this.password.nativeElement.value;
    }
}
