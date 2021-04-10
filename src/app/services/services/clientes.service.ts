import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {



  _SERVICIOS: string = environment._SERVICE;

  constructor(

    public http: HttpClient,
    public router: Router,
    public _sessionService: SessionService,

  ) { }


  generarCobro(data){

    let url = `${this._SERVICIOS}/cliente/cobros/generar`;

    return this.http.post(url, data).pipe(
        map((resp: any) => {
        return resp;
    }),
    catchError((err) => {
        return throwError(err);
    })
    );

  }


  crearClientSingle(data: any, idUser: string) {
    let url = `${this._SERVICIOS}/clientes/crearSingle/${idUser}`;

    return this.http.post(url, data).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );

  }


  getMyAllClientsGET(paginate, id: string){


    let url = `${this._SERVICIOS}/clientes/allByEnrouter/${id}?paginate=${paginate}`;

    return this.http.get(url).pipe(
        map((resp: any) => {
        return resp;
    }),
    catchError((err) => {
        return throwError(err);
    })
    );

  }



  getClientInfoGET(idRuta: string , idUser: string){

    let url = `${this._SERVICIOS}/enrutador/rutas/${idRuta}/${idUser}`;
    return this.http.get(url).pipe(
        map((resp: any) => {
        return resp;
    }),
    catchError((err) => {
        return throwError(err);
    })
    );

  }



  createClientNodo(data, idUser: string, idRuta: string) {


    let url = `${this._SERVICIOS}/negocio/crear/${idUser}/${idRuta}`;

    return this.http.post(url, data).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );

  }

  updateClientNodo(data, idUser: string, idCliente: string) {


    let url = `${this._SERVICIOS}/clientes/modificar/${idUser}/${idCliente}`;

    return this.http.put(url, data).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );

  }


  clientOneDELETE(id: string) {
    console.log('delete', id);
    const url = `${this._SERVICIOS}/clientes/borrar/${this._sessionService.usuario._id}/${id}`;

    return this.http.delete(url).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );

  }

  asignarRuta(ruta: string, cliente: string){
    const url = `${this._SERVICIOS}/clientes/enlazar/${cliente}/${ruta}`;
    return this.http.post(url, []).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

}
