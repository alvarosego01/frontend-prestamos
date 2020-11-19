import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { EnrutadorComponent, MisCobradoresComponent, MisRutasEnrouterComponent, RequestControlEnrouterComponent, StatsEnrouterComponent } from './enrutador.index';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { GlobalModule } from 'src/app/components/global/global.module';

@NgModule({
  declarations: [EnrutadorComponent, MisCobradoresComponent, MisRutasEnrouterComponent, StatsEnrouterComponent, RequestControlEnrouterComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    GlobalModule,
    RouterModule
  ]
})
export class EnrutadorModule { }
