// import { Router } from "@angular/router";
// import { _SERVICIOS } from "./../config/config";

import { HttpClient, HttpHeaders } from "@angular/common/http";
// para poder usar el map
import { map, catchError } from "rxjs/operators";
// import { Observable } from "rxjs";
// import { throwError } from "rxjs//observable/throwError";

import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionService } from './session.service';
import { Router } from '@angular/router';
import { GlobalService } from "./global.service";

// import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  _SERVICIOS: string = environment._SERVICE;



  constructor(

    public http: HttpClient,
    public router: Router,
    public _sessionService: SessionService,

  ) {

  }



  prueba(){

    console.log('prueba', environment);
  }



  userGetEnroutersGET(paginate){

    let url = `${this._SERVICIOS}/users/enrouters?paginate=${paginate}`;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError((err) => {
        return throwError(err);
    })
    );

  }

//   auth
// signup
// reference
  userRegisterPOST(data: any, idRef: string = null){

    let url = `${this._SERVICIOS}/auth/signup`;

    if(idRef != null){
      url = `${url}/reference/${idRef}`;
    }

    console.log('la url', url);
    return this.http.post(url, data).pipe(
        map((resp: any) => {
        return resp;
    }),
    catchError((err) => {
        return throwError(err);
    })
    );

  }

  usersAllGET(paginate){

    let url = `${this._SERVICIOS}/users?paginate=${paginate}`;

    return this.http.get(url).pipe(
        map((resp: any) => {
        return resp;
    }),
    catchError((err) => {
        return throwError(err);
    })
    );

  }



  usersOneGET(id: string){

    let url = `${this._SERVICIOS}/users/getOne/${id}`;

    return this.http.get(url).pipe(
        map((resp: any) => {
        return resp;
    }),
    catchError((err) => {
        return throwError(err);
    })
    );

  }
  usersOnePUT(id: string, data: any){

    let url = `${this._SERVICIOS}/users/${id}`;

    return this.http.put(url, data).pipe(
        map((resp: any) => {
        this._sessionService.guardarStorage(resp.data._id, this._sessionService.token, resp.data);
        return resp;
    }),
    catchError((err) => {
        return throwError(err);
    })
    );

  }
  usersOneDELETE(id: string){

    let url = `${this._SERVICIOS}/users/${id}`;

    return this.http.delete(url).pipe(
        map((resp: any) => {
        return resp;
    }),
    catchError((err) => {
        return throwError(err);
    })
    );

  }






}



