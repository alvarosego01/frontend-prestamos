import { Component, OnInit } from '@angular/core';
import { NotifyService, SessionService } from 'src/app/services/services.index';

@Component({
  selector: 'app-nav-dashboard',
  templateUrl: './nav-dashboard.component.pug',
  styleUrls: ['./nav-dashboard.component.sass']
})
export class NavDashboardComponent implements OnInit {


 

  constructor(
    public _sessionService: SessionService,
    public _notifyService: NotifyService
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
