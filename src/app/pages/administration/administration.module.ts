/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { NgModule } from '@angular/core';
import { NbCardModule, NbCheckboxModule, NbIconModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { AdministrationComponent } from './administration.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import { PermissionsRenderComponent, PermissionsEditorComponent } from './roles/permissions/permissions.component';
import { RoleRenderComponent } from './users/role-render/role-render.component';
import { AdministrationRoutingModule } from './administration-routing.module';
import { PasswordEditorComponent } from './users/password-editor/password-editor.component';


@NgModule({
  imports: [
    NbCardModule,
    Ng2SmartTableModule,
    NbIconModule,
    NbCheckboxModule,
    ThemeModule,
    AdministrationRoutingModule
  ],
  declarations: [
    PermissionsRenderComponent,
    PermissionsEditorComponent,
    RolesComponent,
    RoleRenderComponent,
    PasswordEditorComponent,
    UsersComponent,
    AdministrationComponent
  ],
})
export class AdministrationModule { }
