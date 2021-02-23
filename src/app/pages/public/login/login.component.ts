import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { I_login, I_responseInterface } from 'src/app/interfaces/interfaces.index';
import { FormsResourcesService, GlobalService, NotifyService, SessionService } from 'src/app/services/services/services.index';
import { VisitsSocketService } from 'src/app/services/sockets/socket.index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {




  form: FormGroup;


  errorFields: any = {

      email: {

          required: "Por favor, ingresa tu email",
          email: 'Por favor, ingresa un email válido'

      },
      pass: {

          required: 'Por favor, escribe tu contraseña'

      }

  }


passHide: boolean = false;

  constructor(
    public _notifyService: NotifyService,
    public _sessionService: SessionService,
    public _globalService: GlobalService,
    public router: Router,
    public _formResources: FormsResourcesService,
    private formBuilder: FormBuilder,
    private _visitSocketService: VisitsSocketService
  ) {



  }

  ngOnInit(): void {
    window.scroll(0, 0);
    if (this._sessionService.estaLogueado()) {
      this.router.navigate(['/dashboard']);
    } else {

      this.form = this.formBuilder.group({
        email: [null, [Validators.required, Validators.email]],
        pass: [null, Validators.required],
      });


    }

  }



  prueba() {

    console.log('el form', this.form.get('email'));

  }


  async login() {

    if (this.form.invalid) {

      this._formResources.validateAllFormFields(this.form)

      this._notifyService.messageService.add({
        severity: 'error',
        summary: 'Tienes datos invalidos'
      })
      return;

    }
    // console.log('forma', this.form)
    // return;

    let user: I_login = {
      email: this.form.value.email,
      pass: this.form.value.pass
    }


    // this._globalService.spinner = true;
    await this._sessionService.login(user).subscribe( async (resp: I_responseInterface) => {

      this._notifyService.messageService.add({
        severity: 'success',
        summary: resp.message

      });

      this._sessionService.token = resp.data.token;
      this._sessionService.usuario = resp.data;


      this.router.navigate(['/dashboard']);

      this._visitSocketService.beginVisit().then(r => {
      });


      this._visitSocketService.LISTEN_AnunciosLogin();

    }, (err) => {
      console.error(err);

      this._notifyService.messageService.add({
        severity: 'error',
        summary: err.error.message

      });


      // this._globalService.spinner = false;
    });




  }




  toggleFieldTextType() {
    this.passHide = !this.passHide;
  }



}
