import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard, AdminOrEnruterGuard, LoginVerifyGuard } from 'src/app/services/guards/guards.index';

import { DashboardComponent, NotificationsComponent, ProfileComponent, SettingsComponent, InfoUserComponent } from './dashboard.index';
import { AdminComponent } from './roles/admin/admin.index';



// LoginVerifyGuard


const dashboardRoutes: Routes = [
    {
      path: "dashboard",
      component: DashboardComponent,
      canActivate: [LoginVerifyGuard],
      canActivateChild: [LoginVerifyGuard],
      children: [
        {
          path: "profile",
          component: ProfileComponent,
        },
        {
          path: "notifications",
          component: NotificationsComponent,
        },
        {
          path: "settings",
          component: SettingsComponent,
        },
        {
          path: "infoUser/:id",
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
          loadChildren: () => import('./roles/admin/admin.routes').then( m => m._ADMIN_ROUTES )
        },

        {
          path: "**",
          component: ProfileComponent,
        },

        {
          path: "",
          component: ProfileComponent,
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
    imports: [ RouterModule.forChild(dashboardRoutes) ],
    exports: [ RouterModule ]
})
export class _DASHBOARD_ROUTES {}





// export const _DASHBOARD_ROUTES = RouterModule.forChild(dashboardRoutes);

