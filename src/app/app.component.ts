import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { LoaderService, SessionService } from './services/services.index';
import { GlobalService } from './services/services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.sass']
})
export class AppComponent  implements AfterViewInit {
  title = 'Proyecto';


  constructor(
    public _globalService: GlobalService,
    public _sessionService: SessionService,
    private loaderService: LoaderService,
     private renderer: Renderer2
    ){

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
