import { Component, Input, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-custom-lists',
  templateUrl: './custom-lists.component.pug',
  styleUrls: ['./custom-lists.component.sass']
})
export class CustomListsComponent implements OnInit {


  @Input("registros") registros: any = [];
  @Input("headers") headers: any[] = [];
  @Output() search  =  new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {

    console.log('los items', this.headers);

  }

}
