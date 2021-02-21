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
export class AdminService {

  _SERVICIOS: string = `${environment._SERVICE}/admin`;




  constructor(

    public http: HttpClient,
    public router: Router,


  ) { }


  changeRoleUserPOST(data: any, id: string){

    let url = `${this._SERVICIOS}/users/roles/${id}`;

    return this.http.post(url, data).pipe(
        map((resp: any) => {
        return resp;
    }),
    catchError((err) => {
        return throwError(err);
    })
    );

  }

}
