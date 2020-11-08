import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/services.index';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.pug',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {

  constructor(
    public _sessionService: SessionService
  ) { }

  ngOnInit(): void {
  }

}
