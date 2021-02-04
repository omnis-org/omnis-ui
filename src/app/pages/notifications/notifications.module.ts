/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbTreeGridModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { NotificationsComponent } from './notifications.component';

import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  imports: [
    NbCardModule,
    Ng2SmartTableModule,
    NbIconModule,
    ThemeModule
  ],
  exports: [],
  declarations: [
    NotificationsComponent
  ],
})
export class NotificationsModule { }
