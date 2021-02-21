import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlobalModule } from 'src/app/components/global/global.module';


import { AdminComponent, RequestsControlComponent, RolesControlComponent, RoutesControlComponent, StatsControlComponent, UsersControlComponent } from './admin.index';

import { _ADMIN_ROUTES } from './admin.routes';
import { RouterModule } from '@angular/router';
import { ClientesControlComponent } from './clientes-control/clientes-control.component';

@NgModule({
  declarations: [
    AdminComponent,
    UsersControlComponent,
    RoutesControlComponent, StatsControlComponent, RolesControlComponent, RequestsControlComponent, ClientesControlComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    GlobalModule,
    RouterModule
    // _ADMIN_ROUTES
  ]
})
export class AdminModule { }
