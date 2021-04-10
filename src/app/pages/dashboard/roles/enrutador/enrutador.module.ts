import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { EnrutadorComponent, MisCobradoresComponent, MisRutasEnrouterComponent, RequestControlEnrouterComponent, StatsEnrouterComponent } from './enrutador.index';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { GlobalModule } from 'src/app/components/global/global.module';

import { DialogModule } from 'primeng/dialog';

import { InfoRutaModule } from '../../info-ruta/info-ruta.module';
import { MisClientesComponent } from './mis-clientes/mis-clientes.component';
import { AddClienteComponent } from './mis-clientes/add-cliente/add-cliente.component';
import { MainClientModule } from 'src/app/shared/clients/main-client.module';
import { MainRouteModule } from 'src/app/shared/rutas/main-route-module';

@NgModule({
  declarations: [EnrutadorComponent, MisCobradoresComponent, MisRutasEnrouterComponent, StatsEnrouterComponent, RequestControlEnrouterComponent,  MisClientesComponent, AddClienteComponent],
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
    InfoRutaModule,
    MainClientModule,
    MainRouteModule
  ]
})
export class EnrutadorModule { }
