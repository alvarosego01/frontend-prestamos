import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { I_responseInterface, I_users } from 'src/app/interfaces/interfaces.index';
import { GlobalService, NotifyService, UserService } from 'src/app/services/services.index';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.pug',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  params: any = null;

  userRef: any;

  constructor(
    public _notifyService: NotifyService,
    public _userService: UserService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe( params => {

      this.params = params;

    });


    if( this.params != null && this.params.ref ){


      this.getUserOne(this.params.ref);

    }

  }


  async getUserOne(id: string){

    await this._userService.usersOneGET(id).subscribe((resp) => {

      this.userRef = resp.data;

      this._notifyService.messageService.add({
        severity: 'success',
        summary: 'Enrutador referenciado válido'
      })

    }, (err) => {
        console.error(err);
        this._notifyService.messageService.add({
          severity: 'error',
          summary: 'Enrutador referenciado no válido o inexistente'
        })
        this.userRef = null;
    });

  }


  async userRegister(forma: NgForm){

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
    if(String(forma.value.pass) !== String(forma.value.Cpass) ) {

      this._notifyService.messageService.add({
        severity: 'error',
        summary: 'La contraseña no coincide con la confirmación'
      })

      return;
    }


    let user: I_users = {

      name: forma.value.nombres,
      last_name: forma.value.apellidos,
      id_card: forma.value.cedula,
      pais: forma.value.pais,
      estado: forma.value.estado,
      ciudad: forma.value.ciudad,
      dir_domicilio: forma.value.direccion,
      nro_movil: forma.value.nroCelular,
      nro_fijo: forma.value.nroFijo,
      edad: forma.value.edad,
      email: forma.value.email,
      pass: forma.value.pass,
      // enrutator_id: null

    }

    // if(this.userRef != null){
      // }
      let refs = ( this.userRef != null && this.userRef._id)? this.userRef._id: null;


      console.log('la ref', refs);

    await this._userService.userRegisterPOST(user, refs).subscribe((resp: I_responseInterface) => {

      this._notifyService.messageService.add({
        severity: 'success',
        summary: resp.message

      });

      // forma.reset();
    }, (ERR) => {
      console.error(ERR);


        this._notifyService.messageService.add({
          severity: 'error',
          summary: ERR.error.message ||'Algo ha salido mal, intente más tarde',

        });






    });


  }

}
