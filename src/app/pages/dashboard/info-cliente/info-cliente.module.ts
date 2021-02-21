import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteClientAdminComponent, EditClientAdminComponent, InfoClienteComponent } from './infocliente.index';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { GlobalModule } from 'src/app/components/global/global.module';



@NgModule({
  declarations: [
    InfoClienteComponent,
    DeleteClientAdminComponent,
    EditClientAdminComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    DialogModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    GlobalModule,
  ]
})
export class InfoClienteModule { }
