import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/services.index';

@Component({
  selector: 'app-panel-central',
  templateUrl: './panel-central.component.pug',
  styleUrls: ['./panel-central.component.sass']
})
export class PanelCentralComponent implements OnInit {

  constructor(

    public _sessionService: SessionService,
    private router: Router

  ) { }

  ngOnInit(): void {
  }

}
