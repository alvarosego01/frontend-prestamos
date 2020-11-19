import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService, SearchService, NotifyService, SessionService } from 'src/app/services/services.index';

@Component({
  selector: 'app-mis-cobradores',
  templateUrl: './mis-cobradores.component.pug',
  styleUrls: ['./mis-cobradores.component.sass']
})
export class MisCobradoresComponent implements OnInit {


  allRegisters: any = [];

  paginator: any = [];

  registros: any = [];


  headers: any = [
    "Foto",
    "Nombre",
    "Apellido",
    "Edad",
    "Cédula",
    "Telf fijo",
    "Telf celular",
    "Email",
    // "País",
    // "Estado/departamento",
    // "Ciudad",
    "Rol",
    "Creado en",
    "Ult. Sesión",
    "Status",
    "Opciones"
  ];



  constructor(
    public _userService: UserService,
    public _searchService: SearchService,
    public _notifyService: NotifyService,
    private _sessionService: SessionService
  ) {

    this.getAll();
    console.log('maldita sea');

  }

  ngOnInit(): void {
  }


  async getAll(paginate: number = 1) {

    await this._userService.usersMyCollectorsGET(paginate, this._sessionService.usuario._id ).subscribe((resp) => {

      this.registros = resp.data;

      this.paginator = resp.paginator;

      console.log('los registros', this.registros);


    }, (err) => {
      console.error(err);
    });

  }


  newPageResponse(paginate) {
    this.getAll(paginate);
  }



  async searchUser(forma: NgForm){


    if(forma.invalid){
      return;
    }


      let arg: string = forma.value.arg;


    await this._searchService.searchUserGet(arg).subscribe((resp) => {
      var data = resp.data;

      this.registros = data;

      this.paginator = null


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
