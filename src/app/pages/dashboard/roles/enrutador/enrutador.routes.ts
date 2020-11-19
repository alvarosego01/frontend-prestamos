

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from 'src/app/services/guards/guards.index';
import { ProfileComponent, NotificationsComponent, SettingsComponent } from '../../dashboard.index';

import { MisCobradoresComponent, MisRutasEnrouterComponent, StatsEnrouterComponent } from './enrutador.index';






const enrouterRoutes: Routes = [
    // {
    //   path: "admin",
    //   component: AdminComponent,
    //   canActivate: [AdminGuard],
    //   canActivateChild: [AdminGuard],
    //   children: [

        {
          path: "cobradores",
          component: MisCobradoresComponent,
        },
        {
          path: "rutas",
          component: MisRutasEnrouterComponent,
        },
        {
          path: "peticiones",
          component: MisCobradoresComponent,
        },
        {
          path: "estadisticas",
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
