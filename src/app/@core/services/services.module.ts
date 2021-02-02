/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertService, LayoutService } from './utils'
import { AccountService, RoleService } from './admin'
import {
  GatewayService,
  InstalledSoftwareService,
  InterfaceService,
  LocationService,
  MachineService,
  NetworkService,
  OperatingSystemService,
  PerimeterService,
  SoftwareService,
  TaggedMachineService,
  TagService
} from './omnis';

const SERVICES = [
  LayoutService,
  AlertService,
  AccountService,
  RoleService,
  GatewayService,
  InstalledSoftwareService,
  InterfaceService,
  LocationService,
  MachineService,
  NetworkService,
  OperatingSystemService,
  PerimeterService,
  SoftwareService,
  TagService,
  TaggedMachineService
];

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ...SERVICES
  ],
})
export class ServicesModule {
  static forRoot(): ModuleWithProviders<ServicesModule> {
    return {
      ngModule: ServicesModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
