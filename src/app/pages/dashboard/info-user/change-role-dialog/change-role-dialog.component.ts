import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService, GlobalService, NotifyService, RolesService, SearchService, UserService } from 'src/app/services/services.index';

import Litepicker from "litepicker";

@Component({
  selector: 'app-change-role-dialog',
  templateUrl: './change-role-dialog.component.pug',
  styleUrls: ['./change-role-dialog.component.sass']
})
export class ChangeRoleDialogComponent implements OnInit {


  roles: any = [];

  enrutadores: any = null;

  setTimeRouter: boolean = false;

  @Input("user") user: any = [];
  @Output() close  =  new EventEmitter<boolean>();
  @Output() success  =  new EventEmitter<boolean>();



  picker: any;

  fechas: any = {
    inicio: null,
    finalizacion: null,
  };


  ngfechaPautas: string = null;

  setEnrouterOwner: boolean = false;


  enrutadorSelected: string = null;
  paginator: any = null;

  constructor(
    public _rolesService: RolesService,
    public _usersService: UserService,
    public _adminService: AdminService,
    public _notifyService: NotifyService,
    public _globalService: GlobalService,
    private _searchService: SearchService
  ) {



console.log('abre esto');
   }




  async ngOnInit() {




    await this.getRoles();
    await this.getEnrouters(1);


  }


    newPageResponse(paginate) {
    this.getEnrouters(paginate);
  }



  selectItem( id: string ){

    if( this.user._id == id ){

      this._notifyService.messageService.add({
        severity: 'error',
        summary: 'No puedes asignar al mismo usuario como su enrutador'

      });

      return;
    }


    this.enrutadorSelected = id;

  }


  async getEnrouters(paginate: number = 1){

    await this._usersService.userGetEnroutersGET(paginate).subscribe((resp) => {

      this.enrutadores = resp.data;

      this.paginator = resp.paginator;

    }, (err) => {
      console.error(err);
    });


  }


  async getRoles(){

    await this._rolesService.getAllRolesGET().subscribe((resp) => {

      this.roles = resp.data;

    }, (err) => {

      console.error(err);

    });

  }


  async setNewRole(forma: NgForm){

    if(!forma.valid){


      return;

    }
    let value = JSON.parse(forma.value.roles);

    if(value.alias === this.user.alias){

      this._notifyService.messageService.add({
        severity: 'error',
        summary: 'El usuario ya tiene este rol'

      });
      return;
    }
    let l:any = null;

    if( this.setEnrouterOwner == true ){

      if(this.enrutadorSelected == null){
        this._notifyService.messageService.add({
          severity: 'error',
          summary: 'Debes asignar el usuario a un enrutador '

        });
        return;
      }

      let x: any = {

        rol: value._id,
        enrouter: this.enrutadorSelected,
        type: 'asignEnrouter'

      }
      l = x;

    }else{

      let x: any = {
      rol: value._id,
      type: null
      }
      l = x;

    }

    await this._adminService.changeRoleUserPOST( l, this.user._id ).subscribe((resp) => {

      this._notifyService.messageService.add({
        severity: 'success',
        summary: resp.message

      });

      this.success.emit(true);

    }, (err) => {
        console.error(err);



    });


  }


  selectRole(value: any){

    // console.log('value', value);


    value = JSON.parse(value);

    if(value.alias == 'Cobrador'){

      this.setEnrouterOwner = true;

    }else{
      this.setEnrouterOwner = false;
    }


  }

  closeDialog(){


    this.close.emit(false);
  }




  async setDateBlank(){

    await new Promise((resolve) => setTimeout(resolve, 1000));

    let copyfecha = this.fechas;
    let d = new Date();

    this.picker = new Litepicker({
      element: document.getElementById("fecha"),
      autoApply: true,
      singleMode: false,
      allowRepick: true,
      numberOfColumns: 2,
      numberOfMonths: 2,
      autoclose: true,
      lang: "es",
      // maxDays: 3,
      minDays: 7,
      disallowLockDaysInRange: true,
      format: "DD/MMMM/YYYY",
      inlineMode: false,
      selectForward: true,
      mobileFriendly: true,
      minDate: d.setDate(d.getDate() + 2),
      tooltipText: {
        one: "día",
        other: "días",
      },
      // buttonText:

      onSelect: (resp) => {

        let aux = document.querySelectorAll("#fecha")[0]["value"];
        aux = aux.replaceAll("/", " de ");
        document.querySelectorAll("#fecha")[0]["value"] = aux;
        aux = aux.split(" - ");

        copyfecha.inicio = aux[0];
        copyfecha.finalizacion = aux[1];
        this.fechas = copyfecha;
      },
    });


  }


  async search(forma: NgForm){


    if(forma.invalid){
      return;
    }


    let arg: string = forma.value.arg;


    await this._searchService.searchUserEnrouterGet(arg).subscribe((resp) => {

      this.enrutadores = resp.data;

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
