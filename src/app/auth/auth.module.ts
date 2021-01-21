/**
 * @license
 * Copyright OmnIS. All Rights Reserved.
 * Licensed under the Apache License 2.0.
 * See License in the project root for license information.
 * And NOTICE.txt in the project root for notice information.
 */

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbIconModule, NbLayoutModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { AuthRoutingModule } from './auth-routing.module'
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { NbAuthBlockComponent } from './auth-block/auth-block.component'
import { RegisterComponent } from './register/register.component';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NbIconModule,
    NbLayoutModule,
    NbButtonModule,
    ThemeModule,
    AuthRoutingModule
  ],
  declarations: [
    NbAuthBlockComponent,
    LoginComponent,
    RegisterComponent,
    AuthComponent
  ],
})
export class AuthModule {
}
