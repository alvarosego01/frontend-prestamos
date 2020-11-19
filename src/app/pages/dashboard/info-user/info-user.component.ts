import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService, SessionService, UserService } from 'src/app/services/services.index';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.pug',
  styleUrls: ['./info-user.component.sass']
})
export class InfoUserComponent implements OnInit {


  infoUser: any = null;


  changeRoles: boolean = false;
  deleteUser: boolean = false;

  idUser: string;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _usersService: UserService,
    public _sessionService: SessionService,
    public _globalService: GlobalService
  ) {

    this.activatedRoute.params.subscribe((params) => {
      let id = params["id"];
      this.idUser = id;

      this.getUserProfile(this.idUser);



    });


   }

  ngOnInit(): void {



  }


  async getUserProfile(id: string){

    await this._usersService.usersOneGET(id).subscribe((resp) => {

      this.infoUser = resp.data;



        console.log('infoUser', this.infoUser);
    }, (err) => {
      console.error(err);
    });
  }



  closeRoleDialog(data){

    this.changeRoles = data;
    this.deleteUser = data;

  }

  sucess(data){

    this.getUserProfile(this.idUser);
    this.changeRoles = false;
    this.deleteUser = false;

  }

  showDialog(type: string) {

    // if(this.infoUser._id === this._sessionService.usuario._id){

    //   this._notifyService.messageService.add({
    //     severity: 'error',
    //     summary: 'No'

    //   });
    //   return;

    // }

    if(type == 'roles'){
      this.changeRoles = true;
    }

    if(type == 'deleteUser'){

      this.deleteUser = true;

    }



  }






}
