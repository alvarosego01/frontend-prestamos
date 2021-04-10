import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { MultiSelect } from 'primeng/multiselect';
import {  NotifyService, GlobalService, SearchService, SessionService, RouterService } from 'src/app/services/services/services.index';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-route-handler',
  templateUrl: './route-handler.component.html',
  styleUrls: ['./route-handler.component.sass']
})
export class RouteHandlerComponent implements OnInit {

  modalNewRoute: boolean = false;
  asignModal:boolean = false;
  selectedRoute: string;
  paginator: any = null;
  misRutas: any = [];
  editRoute: any = null;

  constructor(
    public _notifyService: NotifyService,
    public _globalService: GlobalService,
    public _sessionService: SessionService,
    public _routerService: RouterService,
    private _searchService: SearchService,
    private _rote: ActivatedRoute
  ) {

    this.getMyAllRoutes(1);

   }

  ngOnInit(): void {
    console.log(this._rote);
  }


  sucessNewRoute($event){
    this.modalNewRoute = false;
    this.getMyAllRoutes(1);

  }


  closeModal($event){

    this.modalNewRoute = false;

  }

  showDialog(type: string) {

    if (type === 'newRoute'){

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

  delete(id:string){

  }

  edit(route: any): void{
    this.editRoute = route;
    this.modalNewRoute = true;
  }

  asignar(id: string){
    console.log('asign button', id);
    this.selectedRoute = id;
    this.asignModal = true;
  }

  asignSuccess(event){
    this.asignModal = false;
    console.log("succes");
  }

}
