import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { _PUBLIC_ROUTES } from './public.routes';
import { HomeComponent, LoginComponent, RegisterComponent } from './public.index';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';


import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { GlobalModule } from 'src/app/components/global/global.module';
import { _APP_ROUTES } from 'src/app/app.routes';

@NgModule({
  declarations: [
    PublicComponent,
    // HomeComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    GlobalModule,
    _APP_ROUTES

    // _PUBLIC_ROUTES
  ],
  exports: [
    PublicComponent,
LoginComponent,
RegisterComponent,
  ]
})
export class PublicModule { }
