import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MisRutasCollectorComponent } from './mis-rutas-collector/mis-rutas-collector.component';
import { InfoRutaCollectorComponent } from './info-ruta-collector/info-ruta-collector.component';
import { RequestControlCollectorComponent } from './request-control-collector/request-control-collector.component';
import { StatsCollectorComponent } from './stats-collector/stats-collector.component';
import { CobradorComponent } from './cobrador.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { GlobalModule } from 'src/app/components/global/global.module';
import { InfoRutaModule } from '../../info-ruta/info-ruta.module';
import { ControlCobroCollectorComponent } from './info-ruta-collector/control-cobro-collector/control-cobro-collector.component';




@NgModule({
  declarations: [
    MisRutasCollectorComponent,
    InfoRutaCollectorComponent,
    RequestControlCollectorComponent,
    StatsCollectorComponent,
    CobradorComponent,
    ControlCobroCollectorComponent
  ],
  imports: [
    DialogModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    GlobalModule,
    RouterModule,
    InfoRutaModule
  ],
  exports: [
    DialogModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    GlobalModule,
    RouterModule,
    InfoRutaModule
  ]
})
export class CobradorModule { }
