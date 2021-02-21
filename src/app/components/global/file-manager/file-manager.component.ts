import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotifyService, SessionService } from 'src/app/services/services/services.index';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.pug',
  styleUrls: ['./file-manager.component.sass']
})

export class FileManagerComponent implements OnInit {


  uploadedFiles: any[] = [];


  typeFile: any = {
    imagen: "image/*",
  }

  format: string = null;

  @Input("multiple") multiple: boolean = false;
  @Input("type") type: string = null;

  @Output() files = new EventEmitter<boolean>();
  // @Output() success  =  new EventEmitter<boolean>();


  constructor(
    public _notifyService: NotifyService,
    public _sessionService: SessionService,
  ) {

  }


  ngOnInit(): void {

    if( this.type == 'imagen' ){

      this.format = this.typeFile.imagen;

    }

  }


  onUpload(event) {

    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }


    this._notifyService.messageService.add(
      {
        severity: 'success',
        summary: 'Archivo seleccionado',
      }
    )

  }

}
