import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/services/session.service';

@Component({
  selector: 'app-request-control-enrouter',
  templateUrl: './request-control-enrouter.component.html',
  styleUrls: ['./request-control-enrouter.component.sass']
})
export class RequestControlEnrouterComponent implements OnInit {
  allRequest: any[] = [];
  showModal = false;
  title = 'Crear peticion';
  constructor(public _sessionService: SessionService) { }

  ngOnInit(): void {
  }

  add(peticion: any): void{
    this.showModal = true;
  }

  approve(id: string): void{

  }

  deny(id: string): void{

  }

  edit(id: string): void{

  }

  delete(id: string): void{

  }

  getAll(): void{

  }

}
