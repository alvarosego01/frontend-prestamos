import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/services/global.service';
import { NotifyService } from 'src/app/services/services/notify.service';
import { RouterService } from 'src/app/services/services/router.service';
import { SearchService } from 'src/app/services/services/search.service';
import { ClientesService, SessionService, CobradorService, FormsResourcesService } from 'src/app/services/services/services.index';

@Component({
  selector: 'app-control-cobro-collector',
  templateUrl: './control-cobro-collector.component.pug',
  styleUrls: ['./control-cobro-collector.component.sass']
})
export class ControlCobroCollectorComponent implements OnInit {


  @Input("cobro") cobro: any = null;
  @Output() close = new EventEmitter<boolean>();
  @Output() success = new EventEmitter<boolean>();


  form: FormGroup;


  sinPagos: boolean = false;



  errorFields: any = {

    monto: {
      required: "Por favor, especifica el monto a cobrar"
    },


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

    console.log('que es el cobro', this.cobro);

    this.inicializar();

  }


  inicializar(){

    let estatus = this.cobro;

    if(estatus.cuotas.length == 0){


      this.sinPagos = true;


    }

    this.form = this.formBuilder.group({


      // venta: [null, Validators.required],
      // interes: [null, Validators.required],
      monto: [null, Validators.required],

      // cobrador_id
      // cliente_id
      // negocio_id
      // observacion
      // monto


    });





  }



  closeDialog() {


    this.close.emit(false);
  }




async hacerCobro(){


  console.log('ejecuta esto');


    let l = {

      monto: this.form.value.monto,
      observacion: this.form.value.observacion,

      cobrador_id: this.cobro.cobrador_id._id,
      cliente_id: this.cobro.cliente_id._id,
      negocio_id: this.cobro._id,
      // observacion
      // monto

    }

    await this._clientService.generarCobro(l).subscribe((resp) => {

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

}


// cliente_id: {pais: "Colombia", department: "Valle del Cauca", city: "La Victoria", updatedAt: null, createdAt: Array(3), …}
// cobrador_id: {enrutator_id: "5fac03a9c992ec193c4734ba", last_session: Array(3), updatedAt: Array(3), createdAt: Array(3), rol: {…}, …}
// concurrencia: {tipo: "Diario", concurrencia: 1}
// createdAt: (3) ["sábado", "12 de diciembre de 2020", "8:33 PM"]
// cuotas: []
// deleted: false
// domicilio: "Las palmas rio blanco"
// interes: 12
// ncuotas: 20
// pendiente: true
// total: 1120
// updatedAt: null
// vcuotas: 56
// venta: 1000
// __v: 0
// _id: "5fd5533f260a8e1fdc0109f7"