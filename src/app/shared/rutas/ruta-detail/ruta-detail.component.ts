import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RouterService } from 'src/app/services/services/router.service';
import { SessionService } from 'src/app/services/services/session.service';

@Component({
  selector: 'app-ruta-detail',
  templateUrl: './ruta-detail.component.html',
  styleUrls: ['./ruta-detail.component.sass']
})
export class RutaDetailComponent implements OnInit {
  route_id = '';
  routeElement: any;
  titleRoute = '';
  constructor(
    private _route: ActivatedRoute,
    private _routerService: RouterService,
    private _sessionService: SessionService
    ) { }

  ngOnInit(): void {
    this.route_id = this._route.snapshot.params.id;
    this._routerService.getClientysByRoute(this.route_id).subscribe(
      response => {
        console.log('response by route', response);
      }
    );
  }

}
