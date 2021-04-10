

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from 'src/app/services/guards/guards.index';
import { MainClientComponent } from 'src/app/shared/clients/main-client/main-client.index';
import { MainRouteComponent } from 'src/app/shared/rutas/main-route/main-route.component';
import { RutaDetailComponent } from 'src/app/shared/rutas/ruta-detail/ruta-detail.component';
import { ProfileComponent, NotificationsComponent, SettingsComponent } from '../../dashboard.index';

import { InfoRutaComponent } from '../../info-ruta/inforuta.index';

import { MisCobradoresComponent, RequestControlEnrouterComponent, StatsEnrouterComponent } from './enrutador.index';






const enrouterRoutes: Routes = [
    // {
    //   path: "admin",
    //   component: AdminComponent,
    //   canActivate: [AdminGuard],
    //   canActivateChild: [AdminGuard],
    //   children: [

        {
          path: "vendedores",
          component: MisCobradoresComponent,
        },
        {
          path: "rutas",
         // component: MisRutasEnrouterComponent,
         component: MainRouteComponent,
         loadChildren: () => import('../../../../shared/rutas/main-route.routes').then(m => m._ROUTES_ROUTES)
        },
        {
          path: "clientes",
          //component: MisClientesComponent,
      //    component: MainClientComponent,
          loadChildren: () => import('../../../../shared/clients/main-client.routes').then(m => m._CLIENT_ROUTES)
        },
        {
          path: "peticiones",
          component: RequestControlEnrouterComponent,
        },
        {
          path: "reportes",
          component: StatsEnrouterComponent,
        },


        {
          path: "**",
          component: ProfileComponent,
        },

        {
          path: "",
          component: ProfileComponent,
        },
      // ],
    // },
  ];

  @NgModule({
    imports: [ RouterModule.forChild(enrouterRoutes) ],
    exports: [ RouterModule ]
})
export class _ENROUTER_ROUTES {}





// export const _ADMIN_ROUTES = RouterModule.forChild(enrouterRoutes);
