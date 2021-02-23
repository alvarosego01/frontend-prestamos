import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService, GlobalService, RouterService, NotifyService } from 'src/app/services/services/services.index';

@Component({
  selector: 'app-info-ruta',
  templateUrl: './info-ruta.component.html',
  styleUrls: ['./info-ruta.component.sass']
})
export class InfoRutaComponent implements OnInit {


  newNodo: boolean = false;

  idRoute: string = null;

  idUser: string = null;


  infoRoute: any = null;



  showDetails: boolean = false;
  showUpdate: boolean = false;
  showDelete: boolean = false;

  _cliente: any = null;

  constructor(

    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _sessionService: SessionService,
    public _globalService: GlobalService,
    public _routerService: RouterService,
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

    await this._routerService.getRouteInfoGET( id, this.idUser ).subscribe((resp) => {


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

  }

  sucess(data){

    this.getInfoRoute(this.idRoute);
    this.newNodo = false;

    this.showDetails = false;
this.showUpdate = false;
this.showDelete = false;
  }

  showDialog(type: string, _cliente: any = null) {

    if(type == 'newNodo'){
      this.newNodo = true;
    }
    if(type == 'showDetails'){
      this.showDetails = true;
    }
    if(type == 'showUpdate'){
      this.showUpdate = true;
      this._cliente = _cliente;
    }
    if(type == 'showDelete'){
      this.showDelete = true;
      this._cliente = _cliente;
    }



  }


  setReturnPath(){


    if(this._sessionService.usuario.rolName == 'ADMIN_ROLE'){
      this.router.navigate(["/dashboard/admin/rutas"]);
    }
    if(this._sessionService.usuario.rolName == 'ENRUTATOR_ROLE'){
      this.router.navigate(["/dashboard/socio/rutas"]);
    }



  }



  sucessDelete($event){


    this.setReturnPath();

  }
}