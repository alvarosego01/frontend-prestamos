import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewNodoComponent, DeleteNodoComponent, InfoNodoComponent, InfoRutaComponent } from './inforuta.index';


import { DialogModule } from 'primeng/dialog';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { GlobalModule } from 'src/app/components/global/global.module';
import { EditNodoComponent } from './edit-nodo/edit-nodo.component';
import { StatsGeneralComponent } from './stats-general/stats-general.component';
import { ControlCobroComponent } from './control-cobro/control-cobro.component';

@NgModule({
  declarations: [

    InfoRutaComponent,
    AddNewNodoComponent,
    InfoNodoComponent,
    DeleteNodoComponent,
    EditNodoComponent,
    StatsGeneralComponent,
    ControlCobroComponent

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
  ],
  exports: [
    InfoRutaComponent,
    AddNewNodoComponent,
    InfoNodoComponent,
    DeleteNodoComponent,
    StatsGeneralComponent
  ]
})
export class InfoRutaModule { }
