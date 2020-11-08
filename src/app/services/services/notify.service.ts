import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(
    public messageService: MessageService
    ) {}




  prueba(){

      // this.messageService.
      this.messageService.add({severity: 'error',sticky: true ,summary: 'error Message', detail: 'User can not be empty!'});


  }

}
