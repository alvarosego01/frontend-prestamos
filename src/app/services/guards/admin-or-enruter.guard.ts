import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AdminOrEnruterGuard implements CanActivate {
  constructor(
    public _sessionService: SessionService,
    public router: Router
    ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    if (this._sessionService.estaLogueado()) {
      // //////////// ////// //console.log("Paso el guard");

      if (this._sessionService.usuario.rolName == "ADMIN_ROLE" || this._sessionService.usuario.rolName == "ENRUTATOR_ROLE" ) {
        ////// ////// //console.log('es admin');
        return true;
      } else {
        this.router.navigate(["/dashboard"]);
        return false;
      }
    } else {
      // //////////// ////// //console.log('Bloqueado por el guard');
      // si falla entonces lleva al login
      this.router.navigate(["/login"]);
      return false;
    }

  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
}
