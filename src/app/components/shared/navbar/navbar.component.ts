import { Component, OnInit } from '@angular/core';
import { GlobalService, NotifyService, SessionService } from 'src/app/services/services/services.index';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  constructor(
    public _sessionService: SessionService,
    public _notifyService: NotifyService,
    public _globalService: GlobalService
  ) { }

  ngOnInit(): void {
  }


  logout(){


    this._notifyService.messageService.add({
      severity: 'success',
      summary: '¡Vuelva pronto!'

    });

    this._sessionService.logout();

  }

}
