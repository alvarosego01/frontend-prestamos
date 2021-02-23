import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GlobalService, NotifyService, SearchService, UserService } from 'src/app/services/services/services.index';

@Component({
  selector: 'app-users-control',
  templateUrl: './users-control.component.html',
  styleUrls: ['./users-control.component.sass']
})
export class UsersControlComponent implements OnInit {

  allRegisters: any = [];

  paginator: any = [];

  registros: any = [];


  headers: any = [
    "Foto",
    "Nombre y apellido",
    // "Apellido",
    "Edad",
    "Cédula",
    "Telf fijo",
    "Telf celular",
    "Email",
    // "País",
    // "Estado/departamento",
    // "Ciudad",
    // "Rol",
    "Creado en",
    "Ult. Sesión",
    "Status",
    "Opciones"
  ];


  constructor(
    public _userService: UserService,
    public _searchService: SearchService,
    public _notifyService: NotifyService
  ) {

    this.getAll();
    console.log('maldita sea');

  }

  ngOnInit(): void {
  }


  async getAll(paginate: number = 1) {

    await this._userService.usersAllGET(paginate).subscribe((resp) => {

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



  async searchUser(forma: NgForm) {


    if (forma.invalid) {
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
