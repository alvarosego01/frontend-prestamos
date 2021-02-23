import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifyService, SessionService } from 'src/app/services/services/services.index';
import { environment } from 'src/environments/environment';

import { ClipboardService } from 'ngx-clipboard'

@Component({
  selector: 'app-panel-central',
  templateUrl: './panel-central.component.html',
  styleUrls: ['./panel-central.component.sass']
})
export class PanelCentralComponent implements OnInit {

  _PAGEURL: string = `${environment._PAGEURL}/register`;

  typeRoute: string = null;

  constructor(

    public _sessionService: SessionService,
    public _notifyService: NotifyService,
    private router: Router,
    private _clipboardService: ClipboardService,


  ) {

    this._PAGEURL = `${this._PAGEURL}?ref=${this._sessionService.usuario._id}`

    switch (this._sessionService.usuario.rol) {
      case 'Administrador':
        this.typeRoute = 'admin';
        break;
      case 'Socio':
        this.typeRoute = 'Socio';
        break;
      case 'Vendedor':
        this.typeRoute = 'vendedor';
        break;

      default:
        break;
    }

   }

  ngOnInit(): void {
  }


  logout(){
    this._notifyService.messageService.add({
      severity: 'success',
      summary: '¡Vuelva pronto!'

    });

    this._sessionService.logout();
  }

  copyReferLink(event){

    this._clipboardService.copy(this._PAGEURL)

    this._notifyService.messageService.add({
      severity: 'success',
      summary: '¡Enlace copiado!'

    });


  }

}
