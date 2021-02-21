

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from 'src/app/services/guards/guards.index';
import { ProfileComponent, NotificationsComponent, SettingsComponent } from '../../dashboard.index';

import { InfoRutaComponent } from '../../info-ruta/inforuta.index';

import { MisClientesComponent, MisCobradoresComponent, MisRutasEnrouterComponent, RequestControlEnrouterComponent, StatsEnrouterComponent } from './enrutador.index';






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
          component: MisRutasEnrouterComponent,
        },
        {
          path: "clientes",
          component: MisClientesComponent,
        },
        {
          path: "rutas/:id",
          component: InfoRutaComponent,
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
