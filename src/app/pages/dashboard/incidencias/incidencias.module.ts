import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearIncidenciaComponent } from './crear-incidencia/crear-incidencia.component';
import { IncidenciasComponent } from './incidencias.component';



@NgModule({
  declarations: [CrearIncidenciaComponent, IncidenciasComponent],
  imports: [
    CommonModule
  ]
})
export class IncidenciasModule { }
