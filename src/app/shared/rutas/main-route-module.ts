import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRouteComponent, RouteHandlerComponent,AddRutaHandlerComponent } from './route-handler/routehandler.index';
import { BrowserModule } from '@angular/platform-browser';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalModule } from 'src/app/components/global/global.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { InfoRutaModule } from 'src/app/pages/dashboard/info-ruta/info-ruta.module';
import { ConfirmationService } from 'primeng/api';
import { TreeTableModule} from 'primeng/treetable'
import { RutaDetailComponent } from './ruta-detail/ruta-detail.component';
import { MainClientModule } from '../clients/main-client.module';
import {MultiSelectModule} from 'primeng/multiselect';
import { RutaAsignComponent } from './ruta-asign/ruta-asign.component';
import {CheckboxModule} from 'primeng/checkbox';



@NgModule({
  declarations: [MainRouteComponent,AddRutaHandlerComponent,RouteHandlerComponent,RutaDetailComponent,RutaAsignComponent],
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
    InfoRutaModule,
    TreeTableModule,
    MainClientModule,
    MultiSelectModule,
    CheckboxModule
  ],
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
    MainRouteComponent,
    AddRutaHandlerComponent,
    RouteHandlerComponent,
    RutaDetailComponent,
    TreeTableModule,
    MultiSelectModule,
    RutaAsignComponent,
    CheckboxModule
  ],
  providers:[ConfirmationService]
})
export class MainRouteModule { }
