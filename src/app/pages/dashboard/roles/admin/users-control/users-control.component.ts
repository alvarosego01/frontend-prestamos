import { Component, OnInit } from '@angular/core';
import { GlobalService, UserService } from 'src/app/services/services.index';

@Component({
  selector: 'app-users-control',
  templateUrl: './users-control.component.pug',
  styleUrls: ['./users-control.component.sass']
})
export class UsersControlComponent implements OnInit {

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
    public GlobalConfigService: GlobalService
  ) {

    this.getAll();
    console.log('maldita sea');

  }

  ngOnInit(): void {
  }





  async getAll(paginate: number = 1) {

    this.GlobalConfigService.spinner = true;
    await this._userService.usersAllGET(paginate).subscribe((resp) => {

      this.registros = resp.data;

      this.paginator = resp.paginator;

      console.log('los registros', this.registros);


    }, (err) => {
      console.error(err);
    });
    this.GlobalConfigService.spinner = false;

  }


  newPageResponse(paginate) {
    this.getAll(paginate);
  }




 

}
