/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { Component } from '@angular/core';
import { AlertService, RoleService } from '@core/services';
import { LocalDataSource } from 'ng2-smart-table';
import { PermissionsRenderComponent, PermissionsEditorComponent } from './permissions/permissions.component';

@Component({
  selector: 'app-roles',
  styleUrls: ['./roles.component.scss'],
  templateUrl: './roles.component.html',
})
export class RolesComponent {
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
      name: {
        title: 'Name',
        type: 'string',
      },
      omnisPermissions: {
        title: 'Omnis Permissions',
        type: 'custom',
        renderComponent: PermissionsRenderComponent,
        editor: {
          type: 'custom',
          component: PermissionsEditorComponent,
        },
        filter: false
      },
      rolesPermissions: {
        title: 'Roles Permissions',
        type: 'custom',
        renderComponent: PermissionsRenderComponent,
        editor: {
          type: 'custom',
          component: PermissionsEditorComponent,
        },
        filter: false
      },
      usersPermissions: {
        title: 'Users Permissions',
        type: 'custom',
        renderComponent: PermissionsRenderComponent,
        editor: {
          type: 'custom',
          component: PermissionsEditorComponent,
        },
        filter: false
      },
      pendingMachinesPermissions: {
        title: 'Pending Machines Permissions',
        type: 'custom',
        renderComponent: PermissionsRenderComponent,
        editor: {
          type: 'custom',
          component: PermissionsEditorComponent,
        },
        filter: false
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(public roleService: RoleService, private alertService: AlertService) { }

  ngOnInit() {
    // only with activated when implemented
    this.roleService.getAll().subscribe(
      {
        next: roles => {
          this.source.load(roles);
        },
        error: error => {
          this.alertService.error(error);
        }
      }
    );
  }


  onCreateConfirm(event) {
    this.roleService.insert(event.newData).subscribe({
      next: data => {
        this.alertService.success('Role added successfully');
        event.newData.id = data.id;
        event.confirm.resolve(event.newData);
      },
      error: error => {
        this.alertService.error(error);
        event.confirm.reject();
      }
    });
  }

  onSaveConfirm(event) {
    event.newData.id = event.data.id;
    this.roleService.update(event.newData)
      .subscribe({
        next: _ => {
          this.alertService.success('Role updated successfully');
          event.confirm.resolve(event.newData);
        },
        error: error => {
          this.alertService.error(error);
          event.confirm.reject();
        }
      });

  }

  onDeleteConfirm(event) {
    this.roleService.delete(event.data.id)
      .subscribe({
        next: _ => {
          this.alertService.success('Role deleted successfully');
          event.confirm.resolve();
        },
        error: error => {
          this.alertService.error(error);
          event.confirm.reject();
        }
      });
  }

}
