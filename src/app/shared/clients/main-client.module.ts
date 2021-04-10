import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlobalModule } from '../../components/global/global.module';
import { RouterModule } from '@angular/router';
import { InfoRutaModule } from '../../pages/dashboard/info-ruta/info-ruta.module';
import { AddClientHandlerComponent,MainClientComponent,ClientHandlerComponent } from './main-client/main-client.index';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    DialogModule,
    ConfirmDialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    GlobalModule,
    RouterModule,
    InfoRutaModule
  ],
  declarations: [MainClientComponent,AddClientHandlerComponent,ClientHandlerComponent],
  exports:[
    CommonModule,
    BrowserModule,
    DialogModule,
    ConfirmDialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    GlobalModule,
    RouterModule,
    InfoRutaModule,
    MainClientComponent,
    AddClientHandlerComponent,
    ClientHandlerComponent
  ],
  providers:[ConfirmationService]
})
export class MainClientModule { }
