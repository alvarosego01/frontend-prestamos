import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { LoaderService, SessionService } from './services/services/services.index';
import { GlobalService } from './services/services/global.service';

import { VisitsSocketService, WebSocketService } from './services/sockets/socket.index';
import { i_Visit } from './interfaces/interfaces.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.sass']
})
export class AppComponent  implements OnInit, AfterViewInit {
  title = 'Proyecto';


  constructor(
    public _globalService: GlobalService,
    public _sessionService: SessionService,
    private loaderService: LoaderService,
     private renderer: Renderer2,
     public wsService: WebSocketService,
     public _visitSocketService: VisitsSocketService
  ){

  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    // this.wsService.emit('prueba', { hola: 'hola' });

  }


  ngAfterViewInit() {
    this.loaderService.httpProgress().subscribe((status: boolean) => {
      if (status) {
        this.renderer.addClass(document.body, 'cursor-loader');
      } else {
        this.renderer.removeClass(document.body, 'cursor-loader');
      }
    });
  }

}
