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

        const roles = this.roleService.roles;

        const rolesf = roles.filter(role => role.id == this.value);

        if (rolesf.length != 0) {
            this.renderSubject.next(rolesf[0].name);
        } else {
            this.alertService.error("No roles found");
        }

    }

}
