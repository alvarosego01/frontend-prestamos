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


@Injectable({
  providedIn: 'root'
})


export class SearchService {

  _SERVICIOS: string = `${environment._SERVICE}/search`;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _sessionService: SessionService,
  ) { }



  searchUserGet(arg: string){

    let url = `${this._SERVICIOS}/users/${arg}`;

    return this.http.get(url).pipe(
        map((resp: any) => {
        return resp;
    }),
    catchError((err) => {
        return throwError(err);
    })
    );

  }

  searchUserEnrouterGet(arg: string){

    let url = `${this._SERVICIOS}/usersEnrouters/${arg}`;

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
