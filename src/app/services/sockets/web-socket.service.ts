import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { i_Visit } from 'src/app/interfaces/sockets/I_visit';
import { SessionService } from '../services/services.index';
import { VisitsSocketService } from './visits-socket.service';
// import { Socket } from 'dgram';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  public socketStatus = false;
  // public usuario: Usuario = null;

  constructor(
    private socket: Socket,

  ) {
    // this.cargarStorage();
    this.checkStatus();

  }


  async checkStatus() {

    await this.listen('connect').subscribe((resp) => {

      console.log('Conectado al servidor');
      this.socketStatus = true;

    }, (err) => {
        console.error(err);
    });

    await this.listen('disconnect').subscribe((resp) => {

      console.error('Desconectado del servidor');
      this.socketStatus = false;

      // this.removeAllListeners

    }, (err) => {
      console.error(err);
    });


  }

  checkConnect() {
    return this.socket
      .fromEvent("connect")
      .pipe(map(
        (data: any) => {
          return data
        }));
  }

  checkDisconnect(){

    return this.socket
    .fromEvent("disconnect")
    .pipe(map(
      (data: any) => {
        return data
      }));

  }


  emit(evento: string, payload?: any, callback?: Function) {

      this.socket.emit(evento, payload, callback);


  }

  listen(evento: string) {
    // return this.socket.fromEvent(evento);
    return this.socket
    .fromEvent(evento)
    .pipe(map(
      (data: any) => {
        return data
      }));

  }

  removeAllListener(evento: any = null){

    console.log('evento retirado', evento);

    this.socket.removeAllListeners(evento);

  }

  prueba() {

    return new Promise((resolve, reject) => {

      this.emit('prueba', { culo: "culo" }, resp => {

        console.log('se manda el event prueba');

        resolve(true);
      });
    });

  }




}
