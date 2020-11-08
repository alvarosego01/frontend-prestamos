import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DashboardComponent,
  NotificationsComponent, ProfileComponent, SettingsComponent
} from './dashboard.index';
import { _DASHBOARD_ROUTES } from './dashboard.routes';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlobalModule } from 'src/app/components/global/global.module';



@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    NotificationsComponent,
    SettingsComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    GlobalModule,
    // PipesModule,
    _DASHBOARD_ROUTES
  ],
  exports: [
    // DashboardComponent
  ]
})
export class DashboardModule { }
