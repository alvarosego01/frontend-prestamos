import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { LoaderService } from '@app/services';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { GlobalService, LoaderService } from '../services/services.index';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  private count = 0;

  constructor(
    private loaderService: LoaderService,
    public _globalService: GlobalService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('entra el interceptor')

    if (this.count === 0) {
      this.loaderService.setHttpProgressStatus(true);
 
    }
    this.count++;
    console.log('this.count',this.count);
    return next.handle(req).pipe(
      finalize(() => {
        this.count--;
        if (this.count === 0) {
          this.loaderService.setHttpProgressStatus(false);

        }
      }));
  }
}