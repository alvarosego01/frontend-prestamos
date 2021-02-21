import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NotifyService, UserService } from 'src/app/services/services/services.index';

@Component({
  selector: 'app-delete-userr-dialog',
  templateUrl: './delete-userr-dialog.component.pug',
  styleUrls: ['./delete-userr-dialog.component.sass']
})
export class DeleteUserrDialogComponent implements OnInit {


  @Input("user") user: any = null;
  @Output() close  =  new EventEmitter<boolean>();
  @Output() success  =  new EventEmitter<boolean>();



  constructor(
    public _userService: UserService,
    public _notifyService: NotifyService,
    public router: Router
  ) { }



  ngOnInit(): void {
  }






  closeDialog(){


    this.close.emit(false);
  }



  async deleteUser(){


    await this._userService.usersOneDELETE(this.user._id).subscribe((resp) => {

      this._notifyService.messageService.add({
        severity: 'success',
        summary: resp.message

      });

      // this.close.emit(false);
      this.router.navigate(['/dashboard/admin/usuarios']);

    }, (err) => {
      console.error('error custom', err);

      this._notifyService.messageService.add({
        severity: 'warn',
        summary: err.error.message,


      });
    });

  }




}
