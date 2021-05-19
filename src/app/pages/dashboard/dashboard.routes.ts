import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard, AdminOrEnruterGuard, CobradorGuard, EnrutadorGuard, LoginVerifyGuard } from 'src/app/services/guards/guards.index';
import { DashboardComponent, ProfileComponent, NotificationsComponent, SettingsComponent, PanelCentralComponent, InfoUserComponent } from './dashboard.index';
import { InfoClienteComponent } from './info-cliente/infocliente.index';
import { AdminComponent } from './roles/admin/admin.index';
import { EnrutadorComponent } from './roles/enrutador/enrutador.index';

// import { DashboardComponent, NotificationsComponent, ProfileComponent, SettingsComponent, InfoUserComponent, PanelCentralComponent } from '../../dashboard.index';
// import { AdminComponent } from '../admin/admin.index';
// import { EnrutadorComponent } from '../enrutador/enrutador.index';



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
        path: "cliente/:id",
        component: InfoClienteComponent,
        canActivate: [AdminOrEnruterGuard],
        canActivateChild: [AdminOrEnruterGuard],
      },
      {
        path: "admin",
        component: AdminComponent,
        canActivate: [AdminGuard],
        canActivateChild: [AdminGuard],
        // canLoad: [ AuthGuard ],
        loadChildren: () => import('../dashboard/roles/admin/admin.routes').then(m => m._ADMIN_ROUTES)
      },
      {
        path: "socio",
        component: EnrutadorComponent,
        canActivate: [EnrutadorGuard],
        canActivateChild: [EnrutadorGuard],
        // canLoad: [ AuthGuard ],
        loadChildren: () => import('../dashboard/roles/enrutador/enrutador.routes').then(k => k._ENROUTER_ROUTES)
      },

      {
        path: "vendedor",
        component: EnrutadorComponent,
        canActivate: [CobradorGuard],
        canActivateChild: [CobradorGuard],
        // canLoad: [ AuthGuard ],
        loadChildren: () => import('../dashboard/roles/cobrador/collector.routes').then(c => c._COLLECTOR_ROUTES)
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

