

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from 'src/app/services/guards/guards.index';
import { ProfileComponent, NotificationsComponent, SettingsComponent } from '../../dashboard.index';


import { AdminComponent, RequestsControlComponent, RolesControlComponent, RoutesControlComponent, StatsControlComponent, UsersControlComponent } from './admin.index';


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
    // {
    //   path: "admin",
    //   component: AdminComponent,
    //   canActivate: [AdminGuard],
    //   canActivateChild: [AdminGuard],
    //   children: [
        {
          path: "usersControl",
          component: UsersControlComponent,
          data: {
            titulo: 'Control de usuarios'
          }
        },
        {
          path: "routesControl",
          component: RoutesControlComponent,
        },
        {
          path: "chartsControl",
          component: StatsControlComponent,
        },
        {
          path: "rolesControl",
          component: RolesControlComponent,
        },
        {
          path: "requestControl",
          component: RequestsControlComponent,
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
    imports: [ RouterModule.forChild(adminRoutes) ],
    exports: [ RouterModule ]
})
export class _ADMIN_ROUTES {}





// export const _ADMIN_ROUTES = RouterModule.forChild(adminRoutes);
