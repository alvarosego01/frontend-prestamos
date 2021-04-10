import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NotifyService, GlobalService, RouterService, SessionService, FormsResourcesService } from 'src/app/services/services/services.index';

@Component({
  selector: 'app-add-ruta',
  templateUrl: './add-ruta.component.html',
  styleUrls: ['./add-ruta.component.sass']
})
export class AddRutaHandlerComponent implements OnInit {


  // @Input("user") user: any = [];
  @Input() ruta: any;
  @Output() close  =  new EventEmitter<boolean>();
  @Output() success  =  new EventEmitter<boolean>();

  location: any = null;
  locationSelected: any = {
    pais: null,
    department: null,
    city: null
  }
  form: FormGroup;


  errorFields: any = {

    Nombre: {
      required: "Por favor, escribe un nombre para la ruta"
    },
  }

  constructor(
    public _notifyService: NotifyService,
    public _globalService: GlobalService,
    public _routerService: RouterService,
    public _sessionService: SessionService,
    public _formResources: FormsResourcesService,
    private formBuilder: FormBuilder 
  ) { }

  ngOnInit(): void {
    if (this.ruta !== null){
      console.log(this.ruta);
    }

    this.form = this.formBuilder.group({
      Nombre: [null, Validators.required],
    });

  }


  closeDialog(): void{
    this.close.emit(false);
  }



  getLocation($event): void{
    this.location = $event;
  }

 async addNew(){

    if (this.form.invalid ){

      this._notifyService.messageService.add({
        severity: 'error',
        summary: 'Tienes datos invalidos'
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



    let l: any = {

      titleRoute: this.form.value.Nombre,
      pais: this.location.pais,
      department: this.location.estado,
      city: this.location.ciudad,
      enrutador_id: this._sessionService.usuario._id
    }

    await this._routerService.createRoutePOST(l).subscribe((resp) => {

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
