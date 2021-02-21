import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { I_responseInterface, I_users } from 'src/app/interfaces/interfaces.index';
import { FormsResourcesService, GlobalService, NotifyService, UserService } from 'src/app/services/services/services.index';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.pug',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  params: any = null;

  userRef: any;



  form: FormGroup;


  errorFields: any = {

    nombres: {
      required: "Por favor, escribe tus nombres"
    },
    apellidos: {
      required: "Por favor, escribe tus apellidos"
    },
    cedula: {
      required: "Por favor, escribe tu cédula "
    },
    // pais: {
    //   required: "Por favor, selecciona un país "
    // },
    // estado: {
    //   required: "Por favor, escribe un estado o departamento "
    // },
    // ciudad: {
    //   required: "Por favor, escribe tu ciudad"
    // },
    direccion: {
      required: "Por favor, escribe tu dirección "
    },
    edad: {
      required: "Por favor, escribe tu edad"
    },
    nroFijo: {
      required: "Por favor, escribe tu teléfono fijo "
    },
    nroCelular: {
      required: "Por favor, escribe tu teléfono celular "
    },
    email: {
      required: "Por favor, ingresa tu email",
      email: 'Por favor, ingresa un email válido'
    },
    pass: {
      required: "Por favor, escribe tu contraseña "
    },
    Cpass: {
      required: "Por favor, escribe tu confirmación de contraseña "
    },

  }


  passHide: boolean = false;


  location: any = null;


  countriesAuth: string = null;


  constructor(
    public _notifyService: NotifyService,
    public _userService: UserService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public _formResources: FormsResourcesService,
    private formBuilder: FormBuilder,
  ) {

    // this.setPaises();

  }


  getLocation($event){

    console.log('el retorno de esta vaina', $event);
    this.location = $event;

  }


  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe( params => {

      this.params = params;

    });


    if( this.params != null && this.params.ref ){


      this.getUserOne(this.params.ref);

    }


    this.form = this.formBuilder.group({


      nombres: [ null, [Validators.required] ],
      apellidos: [ null, [Validators.required] ],
      cedula: [ null, [Validators.required] ],
      // pais: [ null, [Validators.required] ],
      // estado: [ null, [Validators.required] ],
      // ciudad: [ null, [Validators.required] ],
      direccion: [ null, [Validators.required] ],
      edad: [ null, [Validators.required] ],
      nroFijo: [ null, [Validators.required] ],
      nroCelular: [ null, [Validators.required] ],
      email: [null, [Validators.required, Validators.email]],
      pass: [null, Validators.required],
      Cpass: [ null, [Validators.required] ],


    });


  }


  async getUserOne(id: string){

    await this._userService.usersOneGET(id).subscribe((resp) => {

      this.userRef = resp.data;

      this._notifyService.messageService.add({
        severity: 'success',
        summary: 'Socio referenciado válido'
      })

    }, (err) => {
        console.error(err);
        this._notifyService.messageService.add({
          severity: 'error',
          summary: 'Socio referenciado no válido o inexistente'
        })
        this.userRef = null;
    });

  }


  async userRegister(  ){

    if (this.form.invalid ){


      this._formResources.validateAllFormFields(this.form)

      this._notifyService.messageService.add({
        severity: 'error',
        summary: 'Tienes datos invalidos'
      })
      return;

    }

    if(this.form.value.edad <= 18){

      this._notifyService.messageService.add({
        severity: 'error',
        summary: 'Debes ser mayor de 18 años'
      })

      return;
    }

    if(String(this.form.value.pass) !== String(this.form.value.Cpass) ) {

      this._notifyService.messageService.add({
        severity: 'error',
        summary: 'La contraseña no coincide con la confirmación'
      })

      return;
    }

    if( this.location != null ){

      if( this.location.pais == null || this.location.pais == '' ){
        this._notifyService.messageService.add({
          severity: 'error',
          summary: 'Debes seleccionar un país'
        })

        return;
      }
      if( this.location.estado == null || this.location.estado == '' ){
        this._notifyService.messageService.add({
          severity: 'error',
          summary: 'Debes seleccionar un estado'
        })

        return;
      }
      if( this.location.ciudad == null || this.location.ciudad == '' ){
        this._notifyService.messageService.add({
          severity: 'error',
          summary: 'Debes seleccionar una ciudad'
        })

        return;
      }

    }


    let user: I_users = {

      name: this.form.value.nombres,
      last_name: this.form.value.apellidos,
      id_card: this.form.value.cedula,
      pais: this.location.pais,
      estado: this.location.estado,
      ciudad: this.location.ciudad,
      dir_domicilio: this.form.value.direccion,
      nro_movil: this.form.value.nroCelular,
      nro_fijo: this.form.value.nroFijo,
      edad: this.form.value.edad,
      email: this.form.value.email,
      pass: this.form.value.pass,
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

      // this.form.reset();
    }, (ERR) => {
      console.error(ERR);


        this._notifyService.messageService.add({
          severity: 'error',
          summary: ERR.error.message ||'Algo ha salido mal, intente más tarde',

        });






    });


  }



  toggleFieldTextType() {
    this.passHide = !this.passHide;
  }


}
