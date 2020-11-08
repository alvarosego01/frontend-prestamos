import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { I_responseInterface, I_users } from 'src/app/interfaces/interfaces.index';
import { GlobalService, NotifyService, UserService } from 'src/app/services/services.index';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.pug',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {


  constructor(
    public _notifyService: NotifyService,
    public _userService: UserService,
    private _globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this._userService.prueba();
    // window.scroll(0,0);
    // if(this._sessionService.estaLogueado()){
    //   this.router.navigate(['/dashboard']);
    // }else{

    // }

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
      // enrutator_id: forma.value.

    }

    this._globalService.spinner = true;
    await this._userService.userRegisterPOST(user).subscribe((resp: I_responseInterface) => {

      this._notifyService.messageService.add({
        severity: 'success',
        summary: resp.message

      });

      forma.reset();
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

}
