import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ClientesService } from 'src/app/services/services/clientes.service';
import { NotifyService } from 'src/app/services/services/notify.service';
import { SessionService } from 'src/app/services/services/session.service';

@Component({
  selector: 'app-ruta-asign',
  templateUrl: './ruta-asign.component.html',
  styleUrls: ['./ruta-asign.component.sass']
})
export class RutaAsignComponent implements OnInit {
  paginator: any = null;
  misRutas: any = [];
  selectedClients: string [] = [];

  request: any[] = [];
  @Input() rutaSelected: string;
  @Output() successAsign  =  new EventEmitter<boolean>();
  constructor(
    private _clientesSevice:ClientesService,
    private _sessionService:SessionService,
    private _notifyService:NotifyService
  ) {
  }

  ngOnInit(): void {
    console.log('assign init');
    this.getMyAllRoutes();
  }

  closeDialog(): void
  {
      this.successAsign.emit(false);
  }

  asign(): void{
    this.selectedClients.forEach(client => {
      this._clientesSevice.asignarRuta(this.rutaSelected, client).subscribe(response => {
        console.log('Response', response);
      });
    });

    this.successAsign.emit(true);
  }

  async getMyAllRoutes(paginate = 1){

    await this._clientesSevice.getMyAllClientsGET(paginate, this._sessionService.usuario._id).subscribe((resp) => {

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

  change(event, id){
    if (event.checked){
      this.selectedClients.push(id);
    }
    else{
      this.selectedClients = this.selectedClients.filter(elem =>{
        return elem !== id;
      })
    }
    console.log(this.selectedClients)
  }

}
