/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { NgModule } from '@angular/core';
import {
  NbCardModule,
} from '@nebular/theme';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NgxChartsModule
  ],
  declarations: [
    DashboardComponent,
    PieChartComponent
  ],
})
export class DashboardModule { }
