import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DashboardComponent,
  InfoUserComponent,
  NotificationsComponent, PanelCentralComponent, ProfileComponent, SettingsComponent
} from './dashboard.index';

import { ChangeRoleDialogComponent, ChangePermisionDialogComponent, DeleteUserrDialogComponent } from './info-user/infoUser.index';


import { _DASHBOARD_ROUTES } from './dashboard.routes';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlobalModule } from 'src/app/components/global/global.module';
import { AdminModule } from './roles/admin/admin.module';
import { RouterModule } from '@angular/router';


import {DialogModule} from 'primeng/dialog';
import { EnrutadorModule } from './roles/enrutador/enrutador.module';


@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    NotificationsComponent,
    SettingsComponent,
    InfoUserComponent,
    ChangeRoleDialogComponent,
    ChangePermisionDialogComponent,
    DeleteUserrDialogComponent,
    PanelCentralComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    DialogModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    GlobalModule,
    // PipesModule,
    AdminModule,
    EnrutadorModule,
    RouterModule
    // _DASHBOARD_ROUTES
  ],
  exports: [
    // DashboardComponent
  ]
})
export class DashboardModule { }
