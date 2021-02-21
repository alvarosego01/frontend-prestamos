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
export class CobradorService {


  _SERVICIOS: string = environment._SERVICE;


  constructor(

    public http: HttpClient,
    public router: Router,
    public _sessionService: SessionService,

  ) { }




  usersMyCollectorsGET(paginate, id: string){

    let url = `${this._SERVICIOS}/cobrador/byEnrouter/${id}?paginate=${paginate}`;

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


    let url = `${this._SERVICIOS}/cobrador/infoRuta/${idUser}/${idRuta}`;
    return this.http.get(url).pipe(
        map((resp: any) => {
        return resp;
    }),
    catchError((err) => {
        return throwError(err);
    })
    );

  }


  getRouteInfoByCollector( paginate,  idUser: string){


    let url = `${this._SERVICIOS}/cobrador/rutas/${idUser}?paginate=${paginate}`;
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
