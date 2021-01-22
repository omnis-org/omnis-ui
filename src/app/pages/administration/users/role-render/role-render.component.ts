/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Component, Input, OnInit } from '@angular/core';
import { AlertService, RoleService } from '@core/services';

import { ViewCell } from 'ng2-smart-table';
import { BehaviorSubject } from 'rxjs';

@Component({
    template: `<span>{{renderSubject | async}}</span>`,
})
export class RoleRenderComponent implements ViewCell, OnInit {
    renderSubject: BehaviorSubject<string>;

    @Input() value: string | number;
    @Input() rowData: any;

    constructor(private roleService: RoleService, private alertService: AlertService) {
        this.renderSubject = new BehaviorSubject<string>(null);
    }

    ngOnInit() {
        this.roleService.getById(this.value)
            .subscribe({
                next: data => {
                    this.renderSubject.next(data.name);
                },
                error: error => {
                    this.alertService.error(error);
                }
            });
    }

}
