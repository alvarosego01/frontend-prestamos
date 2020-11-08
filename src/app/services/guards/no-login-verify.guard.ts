import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class noLoginVerifyGuard implements CanActivate, CanActivateChild, CanDeactivate<any> {

  constructor(
    public _sessionService: SessionService,
    public router: Router,
    // private authService: AuthService
  ){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if( this._sessionService.estaLogueado() == false ){
        // //////////// ////// console.log("Paso el guard");
        return true;

      }else{
        // //////////// ////// console.log('Bloqueado por el guard');
        // si falla entonces lleva al login
        this.router.navigate(['/dashboard']);
        return false;

      }
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if( this._sessionService.estaLogueado() == false ){
        // //////////// ////// console.log("Paso el guard");
        return true;

      }else{
        // //////////// ////// console.log('Bloqueado por el guard');
        // si falla entonces lleva al aboutUs
        this.router.navigate(['/dashboard']);
        return false;

      }
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

// canDeactivate
      if( this._sessionService.estaLogueado() == false ){
        // //////////// ////// console.log("Paso el guard");
        // this.router.navigate(['/dashboard']);
        // return this.permissions.canDeactivate(this._sessionService.token);
        // return true;
        return this.router.parseUrl('/dashboard');
      }else{
        // //////////// ////// console.log('Bloqueado por el guard');
        // return false;
        // si falla entonces lleva al aboutUs

      }


  }
  // canLoad(
  //   route: Route,
  //   segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
  //   return true;
  // }




}
