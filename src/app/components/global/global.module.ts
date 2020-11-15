import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomListsComponent, PaginatorComponent, SpinnerComponent } from './global.index';
import { OpenModalComponent } from './open-modal/open-modal.component';




@NgModule({
  declarations: [CustomListsComponent, PaginatorComponent, SpinnerComponent, OpenModalComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CustomListsComponent,
    PaginatorComponent,
    SpinnerComponent,
    OpenModalComponent
  ]
})
export class GlobalModule { }
