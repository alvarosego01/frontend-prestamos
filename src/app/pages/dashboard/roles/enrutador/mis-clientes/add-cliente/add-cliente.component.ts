import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { GlobalService } from 'src/app/services/services/global.service';
import { NotifyService } from 'src/app/services/services/notify.service';
import { RouterService } from 'src/app/services/services/router.service';
import { SearchService } from 'src/app/services/services/search.service';
import { ClientesService, SessionService, CobradorService, FormsResourcesService } from 'src/app/services/services/services.index';

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.sass']
})
export class AddClienteComponent implements OnInit {

  @Input("_ruta") _ruta: any = null;
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


    telefono: {
      required: "Por favor, escribe un número de teléfono"
    },
    mail: {
      required: "Por favor, escribe una dirección de email"
    }


  }



  location: any = null;

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





  getLocation($event){

    console.log('el retorno de esta vaina', $event);
    this.location = $event;

  }

  ngOnInit(): void {

    this.idUser = this._sessionService.usuario._id;

    this.getAllCollectorsByEnrouter(1);


    this.form = this.formBuilder.group({

      name: [null, Validators.required],
      last_name: [null, Validators.required],
      edad: [null, Validators.required],
      card_id: [null, Validators.required],
      telefono: [null, Validators.required],
      mail: [null, Validators.required],

      // concurrenciaCustom: [null, Validators.required],
      // posicion: [null, Validators.required],
      // posicionCustom: [null, Validators.required],

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

    let l = {

        name: this.form.value.name,
        last_name: this.form.value.last_name,
        edad: this.form.value.edad,
        card_id: this.form.value.card_id,
        phone: this.form.value.telefono,
        mail: this.form.value.mail,
        enrutador_id: this.idUser,

        pais: this.location.pais,
        department: this.location.estado,
        city: this.location.ciudad,

    }

    let idUser: string = this.idUser;

    console.log('l', l);
    // return;

    await this._clientService.crearClientSingle(l, idUser).subscribe((resp) => {

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


  async getAllCollectorsByEnrouter(paginate: number = 1) {


    await this._cobradorService.usersMyCollectorsGET(paginate, this._sessionService.usuario._id).subscribe((resp) => {

      this.cobradores = resp.data;

      this.paginator = null;


    }, (err) => {
      console.error(err);
    });



  }


  newPageResponse(paginate) {
    this.getAllCollectorsByEnrouter(paginate);
  }


  async search(forma: NgForm) {


    if (forma.invalid) {
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


    if (tipo === 'Otro') {
      this.form.get(field).enable();
    } else {
      this.form.get(field).disable();
    }

    console.log('elform', this.form.get(field));

  }


  // tipo: "Especifico",
  // lugar: this.form.value.concurrenciaCustom

}


