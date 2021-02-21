import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.pug',
  styleUrls: ['./hero.component.sass']
})
export class HeroComponent implements OnInit {



  @Input("type") type: string = null;
  @Input("titulo") titulo: string = null;
  @Input("subTitulo") subTitulo: string = null;

  @Input("icono") icono: string = null;
  @Input("boton") boton: string = null;


  @Output() accionBoton  =  new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }


  funcionboton(){


    this.accionBoton.emit(true);

  }

}
