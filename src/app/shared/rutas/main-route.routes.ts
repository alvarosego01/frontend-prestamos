
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoRutaComponent } from 'src/app/pages/dashboard/info-ruta/info-ruta.component';
import { InfoRutaCollectorComponent } from 'src/app/pages/dashboard/roles/cobrador/collector.index';

import { ProfileComponent} from '../../pages/dashboard/dashboard.index';
import { MainRouteComponent, RouteHandlerComponent } from './route-handler/routehandler.index';
import { RutaDetailComponent } from './ruta-detail/ruta-detail.component';

export const routeRoutes: Routes = [
      {
        path: "",
        component: RouteHandlerComponent,
      },
      {
        path: "ruta/detail/:id",
        component: RutaDetailComponent,
      },
      {
        path: "rutas/:id",
        component: InfoRutaComponent,
      },
        {
          path: "**",
          component: ProfileComponent,
        }
  ];

  @NgModule({
    imports: [ RouterModule.forChild(routeRoutes) ],
    exports: [ RouterModule ]
})
export class _ROUTES_ROUTES {}
