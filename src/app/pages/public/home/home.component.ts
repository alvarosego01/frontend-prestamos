import { Component, OnInit } from '@angular/core';


import { NotifyService, UserService } from 'src/app/services/services/services.index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(
    public _userService: UserService,
    public _notifyService: NotifyService
  ) {

    // _userService.prueba();



   }

   ngOnInit(): void {
  }


  prueba(){

    this._notifyService.prueba();

  }

}
