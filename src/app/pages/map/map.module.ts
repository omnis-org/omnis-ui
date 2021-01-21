/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { NetworkMapComponent } from './network/network-map.component';
import { MapComponent } from './map.component';


@NgModule({
  imports: [
    ThemeModule,
    NbCardModule
  ],
  exports: [],
  declarations: [
    MapComponent,
    NetworkMapComponent
  ],
})
export class MapModule { }
