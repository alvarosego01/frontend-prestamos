import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/services/global.service';
import { NotifyService } from 'src/app/services/services/notify.service';
import { RouterService } from 'src/app/services/services/router.service';
import { CobradorService, SessionService } from 'src/app/services/services/services.index';

@Component({
  selector: 'app-info-ruta-collector',
  templateUrl: './info-ruta-collector.component.pug',
  styleUrls: ['./info-ruta-collector.component.sass']
})
export class InfoRutaCollectorComponent implements OnInit {





  newNodo: boolean = false;

  idRoute: string = null;

  idUser: string = null;


  infoRoute: any = null;



  showDetails: boolean = false;
  showUpdate: boolean = false;
  showDelete: boolean = false;

  _cliente: any = null;



  controlCobro: boolean = false;
  aCobrar: any = null;




  constructor(

    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _sessionService: SessionService,
    public _globalService: GlobalService,
    public _routerService: RouterService,
    public _collectorService: CobradorService,
    private _notifyService: NotifyService

  ) {

    this.activatedRoute.params.subscribe((params) => {
      let id = params["id"];
      this.idRoute = id;

      this.idUser = this._sessionService.usuario._id;
      this.getInfoRoute(this.idRoute);


    });


   }

  ngOnInit(): void {
  }



  async getInfoRoute(id: string){

    await this._collectorService.getRouteInfoGET( id, this.idUser ).subscribe((resp) => {


      this.infoRoute = resp.data;

      console.log('infoRoute',this.infoRoute);

    }, (err) => {

      console.error(err);

      this._notifyService.messageService.add({
      severity: 'error',
      summary: err.error.message
    });

    if(this._sessionService.usuario.rolName == 'ADMIN_ROLE'){
      this.router.navigate(["/dashboard/admin/rutas/"]);
    }
    if(this._sessionService.usuario.rolName == 'ENRUTATOR_ROLE'){
      this.router.navigate(["/dashboard/socio/rutas/"]);
    }
    });

  }

  closeDialog(data){

    this.newNodo = false;

    this.showDetails = false;
this.showUpdate = false;
this.showDelete = false;


this.aCobrar = null;
this.controlCobro = false;

  }

  sucess(data){

    this.getInfoRoute(this.idRoute);
    this.newNodo = false;

    this.showDetails = false;
this.showUpdate = false;
this.showDelete = false;


this.aCobrar = null;
this.controlCobro = false;

  }

  showDialog(type: string, item: any = null) {

    if(type == 'cobro'){

      console.log('el maldito', item);
      this.aCobrar = item;
      this.controlCobro = true;


    }
    // if(type == 'showDetails'){
    //   this.showDetails = true;
    // }
    // if(type == 'showUpdate'){
    //   this.showUpdate = true;
    //   this._cliente = _cliente;
    // }
    // if(type == 'showDelete'){
    //   this.showDelete = true;
    //   this._cliente = _cliente;
    // }



  }


  setReturnPath(){


    if(this._sessionService.usuario.rolName == 'ADMIN_ROLE'){
      this.router.navigate(["/dashboard/admin/rutas"]);
    }
    if(this._sessionService.usuario.rolName == 'ENRUTATOR_ROLE'){
      this.router.navigate(["/dashboard/socio/rutas"]);
    }


    if(this._sessionService.usuario.rolName == 'COLLECTOR_ROLE'){
      this.router.navigate(["/dashboard/vendedor/rutas"]);
    }



  }



  sucessDelete($event){


    this.setReturnPath();

  }



  reportIncidencia(type){




  }


  sucessCobro($event){


    this.getInfoRoute(this.idRoute);


  }


}
