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


    // if(this._sessionService.token){
// 
    // }
    const token = this._sessionService.token;

    if (!token) {
      return next.handle(req);
    }

    const headers = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    return next.handle(headers);

  }

}
