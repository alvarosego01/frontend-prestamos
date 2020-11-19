import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from '../services/services.index';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    public _sessionService: SessionService
  ) {

  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    if (this._sessionService.estaLogueado() == false) {
      // console.log('no esta logeado');
      return next.handle(req);
    }else{

      const token = this._sessionService.token;
      // console.log('esta logeado' , token);
      const headers = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });

      return next.handle(headers);
    }

  }

}
