/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule, NbLayoutModule, NbListModule, NbPopoverModule, NbSidebarModule, NbToggleModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { NetworkMapComponent } from './network-map/network-map.component';
import { MapComponent } from './map.component';
import { SlideOutComponent } from './slide-out/slide-out.component';
import { DetailsComponent } from './details/details-component';
import { NetworkDetailsComponent } from './details/network/network-details.component';
import { MachineDetailsComponent } from './details/machine/machine-details.component';
import { OsDetailsComponent } from './details/os-details/os-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NbSelectModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { OmnisVersionComponent } from './details/omnis-version/omnis-version.component';

@NgModule({
  imports: [
    NbLayoutModule,
    ThemeModule,
    NbCardModule,
    NbListModule,
    NbSidebarModule,
    NbButtonModule,
    NbIconModule,
    NbToggleModule,
    FormsModule,
    NbSelectModule,
    ReactiveFormsModule,
    NbPopoverModule
  ],
  exports: [],
  declarations: [
    SlideOutComponent,
    NetworkDetailsComponent,
    MachineDetailsComponent,
    OsDetailsComponent,
    DetailsComponent,
    OmnisVersionComponent,
    MapComponent,
    NetworkMapComponent
  ],
})
export class MapModule { }
