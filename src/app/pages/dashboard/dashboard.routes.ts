import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard, AdminOrEnruterGuard, EnrutadorGuard, LoginVerifyGuard } from 'src/app/services/guards/guards.index';

import { DashboardComponent, NotificationsComponent, ProfileComponent, SettingsComponent, InfoUserComponent, PanelCentralComponent } from './dashboard.index';
import { AdminComponent } from './roles/admin/admin.index';
import { EnrutadorComponent } from './roles/enrutador/enrutador.index';



// LoginVerifyGuard


const dashboardRoutes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [LoginVerifyGuard],
    canActivateChild: [LoginVerifyGuard],
    children: [
      {
        path: "perfil",
        component: ProfileComponent,
      },
      {
        path: "notificaciones",
        component: NotificationsComponent,
      },
      {
        path: "configuraciones",
        component: SettingsComponent,
      },
      {
        path: "central",
        component: PanelCentralComponent,
      },
      {
        path: "usuario/:id",
        component: InfoUserComponent,
        canActivate: [AdminOrEnruterGuard],
        canActivateChild: [AdminOrEnruterGuard],
      },

      {
        path: "admin",
        component: AdminComponent,
        canActivate: [AdminGuard],
        canActivateChild: [AdminGuard],
        // canLoad: [ AuthGuard ],
        loadChildren: () => import('./roles/admin/admin.routes').then(m => m._ADMIN_ROUTES)
      },
      
      {
        path: "enrutador",
        component: EnrutadorComponent,
        canActivate: [EnrutadorGuard],
        canActivateChild: [EnrutadorGuard],
        // canLoad: [ AuthGuard ],
        loadChildren: () => import('./roles/enrutador/enrutador.routes').then(k => k._ENROUTER_ROUTES)
      },

      {
        path: "**",
        component: PanelCentralComponent,
      },

      {
        path: "",
        component: PanelCentralComponent,
      },
    ],
  },
];




//   const routes: Routes = [
//     {
//         path: 'dashboard',
//         component: PagesComponent,
//         canActivate: [ AuthGuard ],
//         canLoad: [ AuthGuard ],
//         loadChildren: () => import('./child-routes.module').then( m => m.ChildRoutesModule )
//     },
// ];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class _DASHBOARD_ROUTES { }





// export const _DASHBOARD_ROUTES = RouterModule.forChild(dashboardRoutes);

