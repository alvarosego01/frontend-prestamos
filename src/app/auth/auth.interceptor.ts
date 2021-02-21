import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from '../services/services/services.index';


import { environment } from 'src/environments/environment';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    public _sessionService: SessionService
  ) {

  }


  confirmOtherService(){




  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    if(!req.url.includes(environment._SERVICE)){

      console.log('no existe el servicio, osea s otro');
      return next.handle(req);
    }

    if (this._sessionService.estaLogueado() == false) {
      // console.log('no esta logeado');
      return next.handle(req);
    }else{

      // console.log('el req', req.url);

      const token = this._sessionService.token;
      // console.log('esta logeado' , token);
      const headers = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });

      return next.handle(headers);
    }

  }

}
