import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { i_Visit } from 'src/app/interfaces/interfaces.index';
import { NotifyService, SessionService } from '../services/services.index';
import { WebSocketService } from './web-socket.service';

// import { WebSocketService } from './socket.index';

@Injectable({
  providedIn: 'root'
})
export class VisitsSocketService {

  constructor(
    // private socket: Socket,
    private _webSocketService: WebSocketService,
    private _sessionService: SessionService,
    public _notifyService: NotifyService
  ) {
    this.socketStatus();
  }

  async socketStatus(){

    // this._webSocketService
    this._webSocketService.checkConnect().subscribe((resp) => {

      console.log('conectdo 2')
      // console.log('esta conectado prueba 2');
      if (this._sessionService.estaLogueado() == true) {

        this.beginVisit().then(r => {
        });

        this.LISTEN_AnunciosLogin();
      }



    }, (err) => {
      console.error(err);
    });


    await this._webSocketService.checkDisconnect().subscribe((resp) => {

      console.log('desconectado 2');

      if (this._sessionService.estaLogueado() == true) {

        let l: any = [
          'ADM-anuncio-login'
        ]
        this._webSocketService.removeAllListener(l);

      }

    }, (err) => {
        console.error(err);
    });

  }


  async beginVisit() {

    let dato: any = {
      rol: this._sessionService.usuario.rolName,
      idUser: this._sessionService.usuario._id
    }

    return new Promise((resolve, reject) => {

      this._webSocketService.emit('begin-visit', dato, resp => {

        resolve(true);
      });
    });

  }





  async LISTEN_AnunciosLogin() {


    if (this._sessionService.estaLogueado() == true) {

      if (this._sessionService.usuario.rolName == 'ADMIN_ROLE') {

        console.log('LISTEN_AnunciosLogin');
        // return this.socket.fromEvent('users');
        await this._webSocketService.listen('ADM-anuncio-login').subscribe((resp) => {

          console.log('fulano se logeo', resp);

          this._notifyService.messageService.add({
            severity: 'success',
            summary: resp.message,
            detail: resp.detail,
            // key: 'br'

          });

        }, (err) => {
          console.error(err);
        });

      }


    }


  }


}
