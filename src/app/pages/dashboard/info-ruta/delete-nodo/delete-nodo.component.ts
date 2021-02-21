import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, NotifyService, ClientesService } from 'src/app/services/services/services.index';

@Component({
  selector: 'app-delete-nodo',
  templateUrl: './delete-nodo.component.pug',
  styleUrls: ['./delete-nodo.component.sass']
})
export class DeleteNodoComponent implements OnInit {

  @Input("_cliente") _cliente: any = null;
  @Input("_ruta") _ruta: any = null;
  @Output() close  =  new EventEmitter<boolean>();
  @Output() success  =  new EventEmitter<boolean>();


  constructor(
    public _clienteService: ClientesService,
    public _notifyService: NotifyService,
    public router: Router
  ) { }

  ngOnInit(): void {

    console.log('_cliente', this._cliente);

  }





  closeDialog(){


    this.close.emit(false);
  }



  async deleteUser(){


    await this._clienteService.clientOneDELETE(this._cliente._id).subscribe((resp) => {

      this._notifyService.messageService.add({
        severity: 'success',
        summary: resp.message

      });

      this.success.emit(true);
      // this.router.navigate(['/dashboard/admin/usuarios']);

    }, (err) => {
      console.error('error custom', err);

      this._notifyService.messageService.add({
        severity: 'warn',
        summary: err.error.message,


      });
    });

  }


}
