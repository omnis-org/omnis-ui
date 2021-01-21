/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Component } from '@angular/core';
import { AlertService, AccountService, RoleService } from '@core/services';
import { LocalDataSource } from 'ng2-smart-table';
import { PasswordEditorComponent } from './password-editor/password-editor.component';
import { RoleRenderComponent } from './role-render/role-render.component';

@Component({
  selector: 'app-users',
  styleUrls: ['./users.component.scss'],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  settings = {
    add: {
      confirmCreate: true,
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      confirmDelete: true,
      deleteButtonContent: '<i class="nb-trash"></i>',
    },
    actions: {
      columnTitle: 'Actions',
      position: 'right'
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        editable: false,
        addable: false
      },
      username: {
        title: 'Username',
        type: 'string',
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      password: {
        title: 'Password',
        type: 'string',
        filter: null,
        editor: {
          type: 'custom',
          component: PasswordEditorComponent
        }
      },
      roleId: {
        title: 'Role',
        type: 'custom',
        renderComponent: RoleRenderComponent,
        editor: {
          type: 'list',
          config: {
            list: null
          },
        },
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(public accountService: AccountService, private roleService: RoleService, private alertService: AlertService) { }

  ngOnInit() {
    // only with activated when implemented
    this.accountService.getAll().subscribe(users => {
      users.forEach((_, i) => {
        users[i].password = "";
      })
      this.source.load(users);
    });

    const listRole = []

    this.roleService.getAll().subscribe(roles => {
      roles.forEach((v, _) => {
        listRole.push({ value: v.id, title: v.name })
      })
      this.settings.columns.roleId.editor.config.list = listRole;
      this.settings = Object.assign({}, this.settings);
    });
  }

  onCreateConfirm(event) {
    this.accountService.register(event.newData)
      .subscribe({
        next: data => {
          this.alertService.success('User added successfully');
          event.newData.id = data.id;
          event.newData.password = "";
          event.confirm.resolve(event.newData);
        },
        error: error => {
          this.alertService.error(error);
          event.confirm.reject();
        }
      });
  }

  onSaveConfirm(event) {
    console.log(event);
    this.accountService.update(event.data.id, event.newData)
      .subscribe({
        next: _ => {
          this.alertService.success('User updated successfully');
          event.newData.password = "";
          event.confirm.resolve(event.newData);
        },
        error: error => {
          this.alertService.error(error);
          event.confirm.reject();
        }
      });

  }

  onDeleteConfirm(event) {
    this.accountService.delete(event.data.id)
      .subscribe({
        next: _ => {
          this.alertService.success('User deleted successfully');
          event.confirm.resolve();
        },
        error: error => {
          this.alertService.error(error);
          event.confirm.reject();
        }
      });
  }


}
