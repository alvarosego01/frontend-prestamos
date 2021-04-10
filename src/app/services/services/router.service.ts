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
export class RouterService {

  _SERVICIOS: string = environment._SERVICE;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _sessionService: SessionService,
  ) { }


  // /enrutador/rutas/


  getMyAllRoutesGET(paginate, id: string){


   // let url = `${this._SERVICIOS}/enrutador/rutas/${id}?paginate=${paginate}`;
    let url = `${this._SERVICIOS}/enrutador/rutas/bysocio/${id}?paginate=${paginate}`;

    return this.http.get(url).pipe(
        map((resp: any) => {
        return resp;
    }),
    catchError((err) => {
        return throwError(err);
    })
    );

  }



  getRouteInfoGET(idRuta: string ,idUser: string){


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



  createRoutePOST(data: any){

    let url = `${this._SERVICIOS}/enrutador/rutas/crear`;
    return this.http.post(url, data).pipe(
        map((resp: any) => {
        return resp;
    }),
    catchError((err) => {
        return throwError(err);
    })
    );

  }


  getClientysByRoute(id: string){
    // let url = `${this._SERVICIOS}/enrutador/rutas/${id}?paginate=${paginate}`;
     const url = `${this._SERVICIOS}/enrutador/rutas/clientsbyroute/${id}`;
     return this.http.get(url).pipe(
         map((resp: any) => {
         return resp;
     }),
     catchError((err) => {
         return throwError(err);
     })
     );
   }

}
