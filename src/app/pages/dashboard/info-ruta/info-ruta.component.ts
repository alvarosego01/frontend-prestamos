import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService, GlobalService, RouterService, NotifyService } from 'src/app/services/services/services.index';

@Component({
  selector: 'app-info-ruta',
  templateUrl: './info-ruta.component.html',
  styleUrls: ['./info-ruta.component.sass']
})
export class InfoRutaComponent implements OnInit {


  newNodo = false;
  idRoute: string = null;
  idUser: string = null;
  infoRoute: any = null;
  showDetails = false;
  showUpdate = false;
  showDelete = false;

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
      const id = params.id;
      this.idRoute = id;
      this.idUser = this._sessionService.usuario._id;
      this.getInfoRoute(this.idRoute);

    });


   }

  ngOnInit(): void {
  }

  async getInfoRoute(id: string): Promise<void>{

    await this._routerService.getRouteInfoGET( id, this.idUser ).subscribe((resp) => {
      this.infoRoute = resp.data;
      console.log('infoRoute', this.infoRoute);
    }, (err) => {
      console.error(err);
      this._notifyService.messageService.add({
      severity: 'error',
      summary: err.error.message
    });
      if (this._sessionService.usuario.rolName === 'ADMIN_ROLE'){
        this.router.navigate(['/dashboard/admin/rutas/']);
      }
      if (this._sessionService.usuario.rolName === 'ENRUTATOR_ROLE'){
        this.router.navigate(['/dashboard/socio/rutas/']);
      }
    });

  }

  closeDialog(data): void{
    this.newNodo = false;
    this.showDetails = false;
    this.showUpdate = false;
    this.showDelete = false;
  }

  sucess(data): void{
    this.getInfoRoute(this.idRoute);
    this.newNodo = false;
    this.showDetails = false;
    this.showUpdate = false;
    this.showDelete = false;
  }

  showDialog(type: string, cliente: any = null): void {
    switch (type) {
      case 'newNodo':
        this.newNodo = true;
        break;
      case 'showDetails':
        this.showDetails = true;
        break;
      case 'showUpdate':
        this.showUpdate = true;
        this._cliente = cliente;
        break;
      case 'showDelete':
        this.showDelete = true;
        this._cliente = cliente;
        break;
      default:
        break;
    }
  }

  setReturnPath(): void{
    if (this._sessionService.usuario.rolName === 'ADMIN_ROLE'){
      this.router.navigate(['/dashboard/admin/rutas']);
    }
    if (this._sessionService.usuario.rolName === 'ENRUTATOR_ROLE'){
      this.router.navigate(['/dashboard/socio/rutas']);
    }
  }

  sucessDelete($event): void{
    this.setReturnPath();
  }
}
