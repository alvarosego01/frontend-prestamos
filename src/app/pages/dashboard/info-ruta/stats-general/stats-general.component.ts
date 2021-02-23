import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-statsRoute-general',
  templateUrl: './stats-general.component.html',
  styleUrls: ['./stats-general.component.sass']
})
export class StatsGeneralComponent implements OnInit {


  @Input("_ruta") _ruta: any = null;
  @Output() close = new EventEmitter<boolean>();
  @Output() success = new EventEmitter<boolean>();



  constructor() { }

  ngOnInit(): void {
  }

}
