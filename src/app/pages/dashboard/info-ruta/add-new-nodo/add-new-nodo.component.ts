import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NotifyService, GlobalService, RouterService, SessionService, ClientesService, SearchService, UserService, CobradorService, FormsResourcesService } from 'src/app/services/services/services.index';

@Component({
  selector: 'app-add-new-nodo',
  templateUrl: './add-new-nodo.component.html',
  styleUrls: ['./add-new-nodo.component.sass']
})
export class AddNewNodoComponent implements OnInit {

  @Input("_ruta") _ruta: any = null;
  @Output() close = new EventEmitter<boolean>();
  @Output() success = new EventEmitter<boolean>();


  idUser: string = null;

  misClientes: any = [];

  cobradorSelected: string = null;
  clienteSelected: string = null;



  cobradores: any = [];
  paginator: any = null;
  paginatorClient: any = null;



  confirmNotCollector: boolean = false;



  form: FormGroup;


  errorFields: any = {

      venta: {
        required: "Por favor, especifica el valor de la venta"
      },
      interes: {
        required: "Por favor, especifica el porcentaje de interés"
      },
      ncuotas: {
        required: "Por favor, especifica el número de cuotas"
      },
      domicilio: {
        required: "Por favor, especifica la dirección de cobro"
      },
      concurrencia: {
        required: "Por favor, especifica el modo de concurrencia de cobro de la venta"
      },
      concurrenciaCustom: {
        required: "Por favor, especifica los dias de concurrencia de cobro de la venta "
      }


  }



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

    this.getMyAllRoutes(1);

    this.form = this.formBuilder.group({


      venta: [null, Validators.required],
      interes: [null, Validators.required],
      ncuotas: [null, Validators.required],
      domicilio: [null, Validators.required],
      concurrencia: [null, Validators.required],


    });


    console.log('this.cobradores', this.cobradores);

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

    if(this.clienteSelected == null){


      this._notifyService.messageService.add({
        severity: 'error',
        summary: 'Debes asignarle un cliente a la venta'
      })
      return;


    }
    if(this.cobradorSelected == null){


      this._notifyService.messageService.add({
        severity: 'error',
        summary: 'Debes asignarle un cobrador a la venta'
      })
      return;


    }

    let conc = null;
    let position = null;

    // posicion
    // posicionCustom
    switch (this.form.value.posicion) {

      case "Primero":
      position = {
        tipo: "Primero",
      }
        break;
      case "Ultimo":
      position = {
        tipo: "Ultimo",
      }
        break;
      case "Medio":
      position = {
        tipo: "Medio",
      }
        break;
      case "Especifico":
      position = {
        tipo: "Especifico",
        lugar: this.form.value.concurrenciaCustom || 1
      }
        break;

      default:
      break;

    }
    switch (this.form.value.concurrencia) {

      case 'Diario':
      conc = {
        tipo: this.form.value.concurrencia,
        concurrencia: 1
      }
        break;

      case 'Semanal':
      conc = {
        tipo: this.form.value.concurrencia,
        concurrencia: 7
      }

        break;
        case 'Mensual':
        conc = {
          tipo: this.form.value.concurrencia,
          concurrencia: 30
        }

        break;
        case 'Otro':
            conc = {
              tipo: this.form.value.concurrencia,
              concurrencia: this.form.value.concurrenciaCustom || 1
            }

        break;

      default:
        break;
    }


    //  cliente_id
    // cobrador_id
    // venta
    // interes
    // ncuotas

    let l = {
      cliente_id: this.clienteSelected,
      cobrador_id: this.cobradorSelected || null,
      venta: this.form.value.venta,
      interes: this.form.value.interes,
      ncuotas: this.form.value.ncuotas,
      concurrencia: conc,
      domicilio: this.form.value.domicilio
      // clienteSelected:
    }


    // let l = {

    //   cobrador_id: this.cobradorSelected || null,
    //   card_id: this.form.value.card_id,
    //   name: this.form.value.name,
    //   last_name: this.form.value.last_name,
    //   dir_domicilio: this.form.value.domicilio,
    //   edad: this.form.value.edad,
    //   perce_pagos: this.form.value.perce_pagos,
    //   prestado: this.form.value.prestado,
    //   concurrencia: conc,
    //   posicion: position

    // }

    let idUser: string = this.idUser;
    let rutaId: string = this._ruta._id;

    console.log('l', l);
    // return;

    await this._clientService.createClientNodo(l, idUser, rutaId).subscribe((resp) => {

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



  selectCliente(id: string){


    this.clienteSelected = id;

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


  async search(forma: NgForm){


    if(forma.invalid){
      return;
    }


    let arg: string = forma.value.arg;

    let userId: string = this._sessionService.usuario._id;

    await this._searchService.getCollectorsByEnrouterGET(arg, userId).subscribe((resp) => {

      this.cobradores = resp.data;

      this.paginator = null;

      this._notifyService.messageService.add({
        severity: 'success',
        summary: resp.message,
      });

    }, (err) => {
      console.error('error custom', err);

      this._notifyService.messageService.add({
        severity: 'warn',
        summary: err.error.message,


      });

    });

    forma.reset();


  }



  showConcurrencia(tipo: string, field: string) {


    if(tipo === 'Otro' ) {
         this.form.get(field).enable();
    } else {
         this.form.get(field).disable();
    }

    console.log('elform', this.form.get(field) );

}




async getMyAllRoutes(paginate = 1){


  await this._clientService.getMyAllClientsGET(paginate, this._sessionService.usuario._id).subscribe((resp) => {

    this.misClientes = resp.data;
    this.paginatorClient = resp.paginator;


    console.log('los clientes', this.misClientes);
  }, (err) => {
      console.error(err);

      this._notifyService.messageService.add({
        severity: 'warn',
        summary: err.error.message,


      });

  });

}





}
