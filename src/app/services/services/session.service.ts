import { Router } from "@angular/router";
// import { _SERVICIOS } from "./../config/config";

import { HttpClient, HttpHeaders } from "@angular/common/http";
// para poder usar el map
import { map, catchError } from "rxjs/operators";
// import { Observable } from "rxjs";
// import { throwError } from "rxjs//observable/throwError";

import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  usuario: any;
  token: string = null;
  _SERVICIOS: string = environment._SERVICE;

  constructor(
    public http: HttpClient,
    public router: Router // private _notifyService: NotifyService, // //    public GlobalConfigService:GlobalConfigService
  ) {
    // se llama al cargar storage siemp que se inicialize el servicio para que tengan datos manejables.
    this.cargarStorage();
  }



  login(usuario: any) {
    let url = `${this._SERVICIOS}/auth/signin`;

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.data._id, resp.data.token, resp.data);


        return resp;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  /* -------------------------------------
      <- Cargar storage ->
      Descripción: Con esta funcion nos aseguramos
      de que las variables token y usuario siempre tengan
      un valor valido o nulo que mostrar
    --------------------------------------- */
  cargarStorage() {
    if (localStorage.getItem("token") && localStorage.getItem("user")) {
      this.token = localStorage.getItem("token");
      this.usuario = JSON.parse(localStorage.getItem("user"));


    } else {
      this.token = null;
      this.usuario = null;
    }

  }

  estaLogueado() {
    return this.token && this.token.length > 5 ? true : false;
  }

  /* -------------------------------------
    <- Guardar en Storage ->
    Descripción: Con esta funcion se almacenan
    el id, el usuario, el token en el localstorage
    para manejarse de manera dinamica sin importar
    que se elimine el navegador
  --------------------------------------- */
  guardarStorage(id: string, token: string, usuario: any) {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    // se almacena el usuario pero hay que tener cuidado por que la respuesta que se retorna es un objeto.. para esto se transforma en un string por que localstorage solo almacena strings
    localStorage.setItem("user", JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;

    // this.roleName = new RoleTransformPipe().transform(this.usuario.role);
  }

  logout() {
    this.usuario = null;
    this.token = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("id");
    // una vez al deslogear se pasa al login

    this.router.navigate(["/login"]);
  }




}
