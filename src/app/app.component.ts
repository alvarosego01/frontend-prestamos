import { Component } from '@angular/core';
import { SessionService } from './services/services.index';
import { GlobalService } from './services/services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Proyecto';


  constructor(
    public _globalService: GlobalService,
    public _sessionService: SessionService
    ){

  }

}
