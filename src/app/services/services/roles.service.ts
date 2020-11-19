import { Injectable } from '@angular/core';

// import { _SERVICIOS } from "./../config/config";

import { HttpClient, HttpHeaders } from "@angular/common/http";
// para poder usar el map
import { map, catchError } from "rxjs/operators";
// import { Observable } from "rxjs";
// import { throwError } from "rxjs//observable/throwError";

import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  _SERVICIOS: string = `${environment._SERVICE}/roles`;

  constructor(

    public http: HttpClient,
    public router: Router,

  ) { }

  getAllRolesGET(){

    let url = `${this._SERVICIOS}`;


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
