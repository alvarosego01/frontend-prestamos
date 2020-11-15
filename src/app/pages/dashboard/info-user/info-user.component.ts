import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService, SessionService, UserService } from 'src/app/services/services.index';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.pug',
  styleUrls: ['./info-user.component.sass']
})
export class InfoUserComponent implements OnInit {


  infoUser: any = null;
  display: boolean = false;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _usersService: UserService,
    public _sessionService: SessionService,
    public _globalService: GlobalService
  ) {

    activatedRoute.params.subscribe((params) => {
      let id = params["id"];

      this.getUserProfile(id);



    });


   }

  ngOnInit(): void {
  }


  async getUserProfile(id: string){

    this._globalService.spinner = true;
    await this._usersService.usersOneGET(id).subscribe((resp) => {

      this.infoUser = resp.data;

    }, (err) => {
      console.error(err);
    });
    this._globalService.spinner = false;

  }




  showDialog() {
      this.display = true;
  }
}



