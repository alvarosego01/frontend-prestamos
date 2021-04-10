import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomListsComponent, PaginatorComponent, SpinnerComponent, OpenModalComponent, HeroComponent, FieldErrorDisplayComponentComponent } from './global.index';
import { LoadingComponent } from './loading/loading.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { FileUploadModule } from 'primeng/fileupload';
import { PanelSlizeComponent } from './panel-slize/panel-slize.component';
import { LocationFieldComponent } from './location-field/location-field.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CustomListsComponent,
    PaginatorComponent,
    SpinnerComponent,
    OpenModalComponent,
    HeroComponent,
    LoadingComponent,
    FileManagerComponent,
    FieldErrorDisplayComponentComponent,
    PanelSlizeComponent,
    LocationFieldComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule
  ],
  exports: [
    CommonModule,
    BrowserModule,
    CustomListsComponent,
    PaginatorComponent,
    SpinnerComponent,
    OpenModalComponent,
    HeroComponent,
    LoadingComponent,
    FileManagerComponent,
    FieldErrorDisplayComponentComponent,
    PanelSlizeComponent,
    LocationFieldComponent
  ]
})
export class GlobalModule { }
