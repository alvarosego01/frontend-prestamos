import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard, LoginVerifyGuard, noLoginVerifyGuard } from 'src/app/services/guards/guards.index';
import { LoginComponent, RegisterComponent } from './public.index';




// LoginVerifyGuard


const dashboardRoutes: Routes = [

    {
        path: 'login',
        component: LoginComponent,
        canActivate: [noLoginVerifyGuard],
        canActivateChild: [noLoginVerifyGuard],
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [noLoginVerifyGuard],
        canActivateChild: [noLoginVerifyGuard],
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
export class _PUBLIC_ROUTES {}





// export const _DASHBOARD_ROUTES = RouterModule.forChild(dashboardRoutes);

