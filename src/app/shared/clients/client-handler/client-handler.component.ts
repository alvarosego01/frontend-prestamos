import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ClientesService, GlobalService, NotifyService, RouterService, SearchService, SessionService } from 'src/app/services/services/services.index';

@Component({
  selector: 'app-client-handler',
  templateUrl: './client-handler.component.html',
  styleUrls: ['./client-handler.component.sass']
})
export class ClientHandlerComponent implements OnInit {
  @Input() caller = 'handler';
  modalnewClient = false;
  eliminar = false;
  editClient: any = null;
  paginator: any = null;
  misRutas: any = [];
  modalTitle = 'Nuevo Cliente';
  constructor(
    public _notifyService: NotifyService,
    public _globalService: GlobalService,
    public _sessionService: SessionService,
    public _routerService: RouterService,
    public _clientesSevice: ClientesService,
    private _searchService: SearchService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {


    this.getMyAllRoutes(1);

   }

  ngOnInit(): void {
    console.log('caller', this.caller);
  }


  sucessnewClient(event: any){


    this.modalnewClient = false;
    this.getMyAllRoutes(1);

  }


  closeModal(event: any){

    this.modalnewClient = false;
    this.editClient = null;

  }

  showDialog(type: string): void{
    if (type === 'newClient'){
      this.modalnewClient = true;
      this.editClient = null;
    }

  }

  edit(client: any): void{
      this.editClient = client;
      this.modalTitle = 'Editar Cliente';
      this.modalnewClient = true;
  }

  delete(id: string): void{
    this.confirmationService.confirm({
      message: '¿Está seguro que desea eliminar este elemento?',
      header: 'Eliminar',
      icon: 'pi pi-info-circle',
      accept: () => {
          this._clientesSevice.clientOneDELETE(id).subscribe(resp => {
            this.messageService.add({severity: 'info', summary: 'Confirmado', detail: 'Se ha eliminado el elemento'});
          });

      },
      reject: (type) => {
          console.log('type', type);
      }
  });
  }

  detalle(client: any){

  }

  crearCuenta(id: string){

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

  async search(forma: NgForm): Promise<any>{


    if (forma.invalid){
      return;
    }


    const arg: string = forma.value.arg;


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
