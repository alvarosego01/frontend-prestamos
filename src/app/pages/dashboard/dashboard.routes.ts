import { RouterModule, Routes } from '@angular/router';
import { LoginVerifyGuard } from 'src/app/services/guards/guards.index';

import { DashboardComponent, NotificationsComponent, ProfileComponent, SettingsComponent } from './dashboard.index';



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



export const _DASHBOARD_ROUTES = RouterModule.forChild(dashboardRoutes);
