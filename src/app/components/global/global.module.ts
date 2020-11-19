import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomListsComponent, PaginatorComponent, SpinnerComponent, OpenModalComponent, HeroComponent } from './global.index';
 



@NgModule({
  declarations: [CustomListsComponent, PaginatorComponent, SpinnerComponent, OpenModalComponent, HeroComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CustomListsComponent,
    PaginatorComponent,
    SpinnerComponent,
    OpenModalComponent,
    HeroComponent
  ]
})
export class GlobalModule { }
