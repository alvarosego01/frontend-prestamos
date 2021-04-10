import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/services/global.service';
import { NotifyService } from 'src/app/services/services/notify.service';
import { RouterService } from 'src/app/services/services/router.service';
import { CobradorService, SearchService, SessionService } from 'src/app/services/services/services.index';

@Component({
  selector: 'app-mis-rutas-collector',
  templateUrl: './mis-rutas-collector.component.html',
  styleUrls: ['./mis-rutas-collector.component.sass']
})
export class MisRutasCollectorComponent implements OnInit {

  modalNewRoute: boolean = false;


  paginator: any = null;
  misRutas: any = [];

  constructor(
    public _notifyService: NotifyService,
    public _globalService: GlobalService,
    public _sessionService: SessionService,
    public _routerService: RouterService,
    public _cobradorService: CobradorService,

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


    await this._cobradorService.getRouteInfoByCollector(paginate, this._sessionService.usuario._id).subscribe((resp) => {

      this.misRutas = resp.data;
      this.paginator = resp.paginator;

      console.log('resp', resp);

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
