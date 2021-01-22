/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Component, OnDestroy } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { AccountService } from '@core/services';
import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'app-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <app-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </app-one-column-layout>
  `,
})
export class PagesComponent implements OnDestroy {

  menu: NbMenuItem[] = MENU_ITEMS;

  constructor(private accountService: AccountService) {
    console.log('Page component');

    const pendingMachine = this.menu.filter(menu => menu.title == 'Pending Machines')[0];
    const administration = this.menu.filter(menu => menu.title == 'Administration')[0];
    const roles = administration.children.filter(child => child.title == 'Roles')[0];
    const users = administration.children.filter(child => child.title == 'Users')[0];

    pendingMachine.hidden = true;
    administration.hidden = true;
    roles.hidden = true;
    users.hidden = true;

    this.accountService.role$.subscribe({
      next: role => {
        if (role != null) {
          pendingMachine.hidden = !role.pendingMachinesReadPermission;
          administration.hidden = !role.rolesReadPermission && !role.usersReadPermission;
          roles.hidden = !role.rolesReadPermission;
          users.hidden = !role.usersReadPermission;
        }
      },
      error: error => {
        console.log(error);
      }
    });
  }

  ngOnDestroy() {
    console.log('Destroy Page component');
  }



}
