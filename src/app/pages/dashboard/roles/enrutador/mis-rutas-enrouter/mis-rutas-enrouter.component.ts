import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {  NotifyService, GlobalService, SearchService, SessionService, RouterService } from 'src/app/services/services/services.index';

@Component({
  selector: 'app-mis-rutas-enrouter',
  templateUrl: './mis-rutas-enrouter.component.pug',
  styleUrls: ['./mis-rutas-enrouter.component.sass']
})
export class MisRutasEnrouterComponent implements OnInit {


  modalNewRoute: boolean = false;


  paginator: any = null;
  misRutas: any = [];

  constructor(
    public _notifyService: NotifyService,
    public _globalService: GlobalService,
    public _sessionService: SessionService,
    public _routerService: RouterService,
    private _searchService: SearchService,
  ) {


    this.getMyAllRoutes(1);

   }

  ngOnInit(): void {
  }


  sucessNewRoute($event){


    this.modalNewRoute = false;
    this.getMyAllRoutes(1);

  }


  closeModal($event){

    this.modalNewRoute = false;

  }

  showDialog(type: string) {

    if(type == 'newRoute'){

      this.modalNewRoute = true;

    }

  }

  async getMyAllRoutes(paginate = 1){


    await this._routerService.getMyAllRoutesGET(paginate, this._sessionService.usuario._id).subscribe((resp) => {

      this.misRutas = resp.data;
      this.paginator = resp.paginator;



    }, (err) => {
        console.error(err);

        this._notifyService.messageService.add({
          severity: 'warn',
          summary: err.error.message,


        });

    });

  }


  getAll(paginate){

    this.getMyAllRoutes(paginate);

  }

  async search(forma: NgForm){


    if(forma.invalid){
      return;
    }


    let arg: string = forma.value.arg;


    await this._searchService.searchMyRoutesEnrouter(arg).subscribe((resp) => {

      this.misRutas = resp.data;

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

}
