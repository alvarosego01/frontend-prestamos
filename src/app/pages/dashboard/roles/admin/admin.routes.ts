

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from 'src/app/services/guards/guards.index';
import { MainClientComponent } from 'src/app/shared/clients/main-client/main-client.component';
import { MainRouteComponent } from 'src/app/shared/rutas/main-route/main-route.component';
import { ProfileComponent, NotificationsComponent, SettingsComponent } from '../../dashboard.index';
import { PanelCentralComponent } from '../../panel-central/panel-central.component';


import { AdminComponent, ClientesControlComponent, RequestsControlComponent, RolesControlComponent, RoutesControlComponent, StatsControlComponent, UsersControlComponent } from './admin.index';


// {
//     name: "Gestión de usuarios",
//     icon: null,
//     url: "usersControl",
//     child: [
//         {
//           name: "Información de usuario",
//         icon: null,
//          url: "user/:id"
//       }
//       ],
//   },
//   {
//     name: "Gestión de rutas",
//     icon: null,
//     url: "routesControl",
//     child: [
//       {
//         name: "Información de ruta",
//       icon: null,
//        url: "route/:id"
//     }
//     ],
//   },
//   {
//     name: "Estadísticas generales",
//     icon: null,
//     url: "chartsControl"

//   },
//   {
//     name: "Control de roles",
//     icon: null,
//     url: "rolesControl",
//   },


// UsersControlComponent
// RoutesControlComponent
// StatsControlComponent
// RolesControlComponent
// RequestsControlComponent

const adminRoutes: Routes = [

        {
          path: "usuarios",
          component: UsersControlComponent,
        },
        {
          path: "rutas",
          component: MainRouteComponent,
          loadChildren: () => import('../../../../shared/rutas/main-route.routes').then(m => m._ROUTES_ROUTES)
        },
        {
          path: "clientes",
          component: MainClientComponent,
          loadChildren: () => import('../../../../shared/clients/main-client.routes').then(m => m._CLIENT_ROUTES)
        },
        {
          path: "reportes",
          component: StatsControlComponent,
        },
        {
          path: "roles",
          component: RolesControlComponent,
        },
        {
          path: "peticiones",
          component: RequestsControlComponent,
        },

        {
          path: "**",
          component: AdminComponent,
        },

        {
          path: "",
          component: AdminComponent,
        },
      // ],
    // },
  ];

  @NgModule({
    imports: [ RouterModule.forChild(adminRoutes) ],
    exports: [ RouterModule ]
})
export class _ADMIN_ROUTES {}





// export const _ADMIN_ROUTES = RouterModule.forChild(adminRoutes);
