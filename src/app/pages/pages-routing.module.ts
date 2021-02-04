/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { MapComponent } from './map/map.component';
import { PendingMachinesComponent } from './pending-machines/pending-machines.component';
import { NotificationsComponent } from './notifications/notifications.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'map',
      component: MapComponent
    },
    {
      path: 'notifications',
      component: NotificationsComponent
    },
    {
      path: 'pending-machines',
      component: PendingMachinesComponent
    },
    {
      path: 'administration',
      loadChildren: () => import('./administration/administration.module')
        .then(m => m.AdministrationModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
