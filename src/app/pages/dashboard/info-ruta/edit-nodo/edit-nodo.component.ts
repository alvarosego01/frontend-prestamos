import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NotifyService, GlobalService, RouterService, SessionService, ClientesService, SearchService, UserService, CobradorService, FormsResourcesService } from 'src/app/services/services/services.index';

@Component({
  selector: 'app-edit-nodo',
  templateUrl: './edit-nodo.component.pug',
  styleUrls: ['./edit-nodo.component.sass']
})
export class EditNodoComponent implements OnInit {

  @Input("_ruta") _ruta: any = null;
  @Input("_cliente") _cliente: any = null;
  @Output() close = new EventEmitter<boolean>();
  @Output() success = new EventEmitter<boolean>();


  idUser: string = null;


  cobradorSelected: string = null;



  cobradores: any = null;
  paginator: any = null;



  confirmNotCollector: boolean = false;



  form: FormGroup;


  errorFields: any = {

      name: {
        required: "Por favor, escribe el nombre del cliente"
      },
      last_name: {
        required: "Por favor, escribe el apellido del cliente"
      },
      edad: {
        required: "Por favor, escribe la dedad del cliente"
      },
      card_id: {
        required: "Por favor, escribe la identificación o cédula del cliente"
      },
      domicilio: {
        required: "Por favor, escribe el domicilio del cliente"
      },
      prestado: {
        required: "Por favor, escribe la cantidad prestada al cliente"
      },
      perce_pagos: {
        required: "Por favor, escribe el porcentaje de ganancia"
      },
      concurrencia: {
        required: "Por favor, escribe la concurrencia de cobro"
      },
      concurrenciaCustom: {
        required: "Por favor, especifica la concurrencia de cobro en días"
      },
      posicion: {
        required: "Por favor, escribe la posición en la cual añadir al cliente"
      },
      posicionCustom: {
        required: "Por favor, especifica la posición en la cual añadir al cliente"
      },


  }



  name: string = null;
  last_name: string = null;
  edad: string = null;
  card_id: string = null;
  domicilio: string = null;

  arg: string = null;

  constructor(
    public _notifyService: NotifyService,
    public _globalService: GlobalService,
    public _routerService: RouterService,
    public _clientService: ClientesService,
    public _sessionService: SessionService,
    public _searchService: SearchService,
    public _cobradorService: CobradorService,
    public _formResources: FormsResourcesService,
    private formBuilder: FormBuilder
  ) { }




  ngOnInit(): void {

    this.idUser = this._sessionService.usuario._id;

    this.getAllCollectorsByEnrouter( 1 );


    this.form = this.formBuilder.group({

      name: [null, Validators.required],
      last_name: [null, Validators.required],
      edad: [null, Validators.required],
      card_id: [null, Validators.required],
      domicilio: [null, Validators.required],
      // prestado: [null, Validators.required],
      // perce_pagos: [null, Validators.required],
      // concurrencia: [null, Validators.required],
      // concurrenciaCustom: [null, Validators.required],
      // posicion: [null, Validators.required],
      // posicionCustom: [null, Validators.required],

    });


    this.cobradorSelected = this._cliente.cobrador_id._id;

    this.name = this._cliente.name;
    this.last_name = this._cliente.last_name;
    this.edad = this._cliente.edad;
    this.card_id = this._cliente.card_id;
    this.domicilio = this._cliente.dir_domicilio;



    // console.log('select cobrador', this.cobradorSelected);

  }


  closeDialog() {


    this.close.emit(false);
  }




  async addNew() {

    if (this.form.invalid) {


      this._formResources.validateAllFormFields(this.form)

      this._notifyService.messageService.add({
        severity: 'error',
        summary: 'Tienes datos invalidos'
      })
      return;

    }

    if(this.cobradorSelected == null){


      this._notifyService.messageService.add({
        severity: 'error',
        summary: 'Debes asignarle un cobrador al cliente'
      })
      return;


    }

    let conc = null;
    let position = null;

    // posicion
    // posicionCustom
    // switch (this.form.value.posicion) {

    //   case "Primero":
    //   position = {
    //     tipo: "Primero",
    //   }
    //     break;
    //   case "Ultimo":
    //   position = {
    //     tipo: "Ultimo",
    //   }
    //     break;
    //   case "Medio":
    //   position = {
    //     tipo: "Medio",
    //   }
    //     break;
    //   case "Especifico":
    //   position = {
    //     tipo: "Especifico",
    //     lugar: this.form.value.concurrenciaCustom || 1
    //   }
    //     break;

    //   default:
    //   break;

    // }
    // switch (this.form.value.concurrencia) {

    //   case 'Diario':
    //   conc = {
    //     tipo: this.form.value.concurrencia,
    //     concurrencia: 1
    //   }
    //     break;

    //   case 'Semanal':
    //   conc = {
    //     tipo: this.form.value.concurrencia,
    //     concurrencia: 7
    //   }

    //     break;
    //     case 'Mensual':
    //     conc = {
    //       tipo: this.form.value.concurrencia,
    //       concurrencia: 30
    //     }

    //     break;
    //     case 'Otro':
    //         conc = {
    //           tipo: this.form.value.concurrencia,
    //           concurrencia: this.form.value.concurrenciaCustom || 1
    //         }

    //     break;

    //   default:
    //     break;
    // }

    let l = {

      cobrador_id: this.cobradorSelected || null,
      card_id: this.form.value.card_id,
      name: this.form.value.name,
      last_name: this.form.value.last_name,
      dir_domicilio: this.form.value.domicilio,
      edad: this.form.value.edad,

    }

    let idUser: string = this.idUser;
    let clienteId: string = this._cliente._id;


    // return;

    await this._clientService.updateClientNodo(l, idUser, clienteId).subscribe((resp) => {

      this._notifyService.messageService.add({
        severity: 'success',
        summary: resp.message

      });



      this.success.emit(true);

    }, (err) => {
      console.error(err);


      this._notifyService.messageService.add({
        severity: 'error',
        summary: err.error.message

      });


    });




  }




  selectItem(id: string) {

    // if( this.user._id == id ){

    //   this._notifyService.messageService.add({
    //     severity: 'error',
    //     summary: 'No puedes asignar al mismo usuario como su enrutador'

    //   });

    //   return;
    // }


    this.cobradorSelected = id;

  }


  async getAllCollectorsByEnrouter( paginate: number = 1){


    await this._cobradorService.usersMyCollectorsGET(paginate, this._sessionService.usuario._id ).subscribe((resp) => {

      this.cobradores = resp.data;

      this.paginator = null;


    }, (err) => {
      console.error(err);
    });



  }


  newPageResponse(paginate) {
    this.getAllCollectorsByEnrouter(paginate);
  }


  async search(){





    let arg: string = this.arg;

    let userId: string = this._sessionService.usuario._id;

    console.log('arg', arg);

    await this._searchService.getCollectorsByEnrouterGET(arg, userId).subscribe((resp) => {

      this.cobradores = resp.data;

      this.paginator = null;

      this._notifyService.messageService.add({
        severity: 'success',
        summary: resp.message,
      });

      console.log('respuesta', resp);

    }, (err) => {
      console.error('error custom', err);

      this._notifyService.messageService.add({
        severity: 'warn',
        summary: err.error.message,


      });

    });

    this.arg = null;


  }



  showConcurrencia(tipo: string, field: string) {


    if(tipo === 'Otro' ) {
         this.form.get(field).enable();
    } else {
         this.form.get(field).disable();
    }

    console.log('elform', this.form.get(field) );

}


}
