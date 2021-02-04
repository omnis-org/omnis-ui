/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule, NbLayoutModule, NbSidebarModule, NbToggleModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { NetworkMapComponent } from './network-map/network-map.component';
import { MapComponent } from './map.component';
import { SlideOutComponent } from './slide-out/slide-out.component';
import { DetailsComponent } from './details/details-component';
import { NetworkDetailsComponent } from './details/network/network-details.component';
import { MachineDetailsComponent } from './details/machine/machine-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NbSelectModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    NbLayoutModule,
    ThemeModule,
    NbCardModule,
    NbSidebarModule,
    NbButtonModule,
    NbIconModule,
    NbToggleModule,
    FormsModule,
    NbSelectModule,
    ReactiveFormsModule
  ],
  exports: [],
  declarations: [
    SlideOutComponent,
    NetworkDetailsComponent,
    MachineDetailsComponent,
    DetailsComponent,
    MapComponent,
    NetworkMapComponent
  ],
})
export class MapModule { }
