import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomListsComponent, PaginatorComponent, SpinnerComponent } from './global.index';




@NgModule({
  declarations: [CustomListsComponent, PaginatorComponent, SpinnerComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CustomListsComponent,
PaginatorComponent,
SpinnerComponent,
  ]
})
export class GlobalModule { }
