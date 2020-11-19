import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.pug',
  styleUrls: ['./hero.component.sass']
})
export class HeroComponent implements OnInit {



  @Input("type") type: string = null;
  @Input("titulo") titulo: string = null;
  @Input("subTitulo") subTitulo: string = null;

  @Input("link") link: string = null;
  @Input("boton") boton: string = null;

  constructor() { }

  ngOnInit(): void {
  }

}
