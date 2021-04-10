import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { I_responseInterface, I_users } from 'src/app/interfaces/interfaces.index';
import { GlobalService, NotifyService, SessionService, UserService } from 'src/app/services/services/services.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  usuario: any = null;

        // "name": "fsdfds",
        // "last_name": "fsdfsdf",
        // "id_card": "dsdsfdsf",
        // "pais": "Colombia",
        // "estado": "adsfasdf",
        // "ciudad": "adsfadsf",
        // "dir_domicilio": "afasff",
        // "nro_movil": "1234",
        // "nro_fijo": "12345",
        // "edad": 20,
        // "email": "alvarosego01@gmail.com",
        // "enrutator_id": null,
        // "rol": "Default",

        nombres: string;
        apellidos: string;
        cedula: string;
        pais: string;
        estado: string;
        ciudad: string;
        direccion: string;
        nroCelular: string;
        nroFijo: string;
        edad: string;

  constructor(
    public _sessionService: SessionService,
    public _notifyService: NotifyService,
    public _globalService: GlobalService,
    public _userService: UserService,
    private _route:ActivatedRoute,
  ) {

    this.setUserInfo();
  }

  ngOnInit(): void {
    console.log(this._route);
  }

 async userEdit(forma: NgForm){

    if (forma.invalid ){

      this._notifyService.messageService.add({
        severity: 'error',
        summary: 'Tienes datos invalidos'
      })
      return;

    }

    if(forma.value.edad <= 18){

      this._notifyService.messageService.add({
        severity: 'error',
        summary: 'Debes ser mayor de 18 años'
      })

      return;
    }


    let user: I_users = {

      name: this.nombres,
      last_name: this.apellidos,
      id_card: this.cedula,
      pais: this.pais,
      estado: this.estado,
      ciudad: this.ciudad,
      dir_domicilio: this.direccion,
      nro_movil: this.nroCelular,
      nro_fijo: this.nroFijo,
      edad: this.edad,

      // enrutator_id: forma.value.

    }

    this._globalService.spinner = true;
    await this._userService.usersOnePUT(this._sessionService.usuario._id, user).subscribe((resp: I_responseInterface) => {

      this._notifyService.messageService.add({
        severity: 'success',
        summary: resp.message

      });

      this._sessionService.usuario = resp.data;


      this._globalService.spinner = false;
    }, (err) => {
      console.error(err);

      this._notifyService.messageService.add({
        severity: 'error',
        summary: err.error.message

      });


        this._globalService.spinner = false;
    });



  }


  setUserInfo(){

    this.nombres = this._sessionService.usuario.name;
    this.apellidos = this._sessionService.usuario.last_name;
    this.cedula = this._sessionService.usuario.id_card;
    this.pais = this._sessionService.usuario.pais;
    this.estado = this._sessionService.usuario.estado;
    this.ciudad = this._sessionService.usuario.ciudad;
    this.direccion = this._sessionService.usuario.dir_domicilio;
    this.nroCelular = this._sessionService.usuario.nro_movil;
    this.nroFijo = this._sessionService.usuario.nro_fijo;
    this.edad = this._sessionService.usuario.edad;

  }





}
