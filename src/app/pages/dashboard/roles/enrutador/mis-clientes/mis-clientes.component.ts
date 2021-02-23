import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ClientesService, GlobalService, NotifyService, RouterService, SearchService, SessionService } from 'src/app/services/services/services.index';

@Component({
  selector: 'app-mis-clientes',
  templateUrl: './mis-clientes.component.html',
  styleUrls: ['./mis-clientes.component.sass']
})
export class MisClientesComponent implements OnInit {

  modalnewClient: boolean = false;


  paginator: any = null;
  misRutas: any = [];

  constructor(
    public _notifyService: NotifyService,
    public _globalService: GlobalService,
    public _sessionService: SessionService,
    public _routerService: RouterService,
    public _clientesSevice: ClientesService,
    private _searchService: SearchService,
  ) {


    this.getMyAllRoutes(1);

   }

  ngOnInit(): void {
  }


  sucessnewClient($event){


    this.modalnewClient = false;
    this.getMyAllRoutes(1);

  }


  closeModal($event){

    this.modalnewClient = false;

  }

  showDialog(type: string) {

    if(type == 'newClient'){

      this.modalnewClient = true;

    }

  }

  async getMyAllRoutes(paginate = 1){


    await this._clientesSevice.getMyAllClientsGET(paginate, this._sessionService.usuario._id).subscribe((resp) => {

      console.log('resp', resp);

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
Init(): void {
  }

}
