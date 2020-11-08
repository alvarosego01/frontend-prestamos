import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { I_login, I_responseInterface } from 'src/app/interfaces/interfaces.index';
import { GlobalService, NotifyService, SessionService } from 'src/app/services/services.index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.pug',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(
    public _notifyService: NotifyService,
    public _sessionService: SessionService,
    public _globalService: GlobalService,
    public router: Router
  ) { }

  ngOnInit(): void {
    window.scroll(0,0);
    if(this._sessionService.estaLogueado()){
      this.router.navigate(['/dashboard']);
    }else{

    }

  }

  async login(forma: NgForm){

    if (forma.invalid ){

      this._notifyService.messageService.add({
        severity: 'error',
        summary: 'Tienes datos invalidos'
      })
      return;

    }

    let user : I_login = {
      email: forma.value.email,
      pass: forma.value.pass
    }


    this._globalService.spinner = true;
    await this._sessionService.login(user).subscribe((resp: I_responseInterface) => {

      this._notifyService.messageService.add({
        severity: 'success',
        summary: resp.message

      });

      this._sessionService.token = resp.data.token;
      this._sessionService.usuario = resp.data;

      console.log('respuesta', resp);

      this._globalService.spinner = false;
      this.router.navigate(['/dashboard']);
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
