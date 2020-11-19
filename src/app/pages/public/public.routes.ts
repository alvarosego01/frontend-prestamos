import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { noLoginVerifyGuard } from 'src/app/services/guards/guards.index';
import { LoginComponent, RegisterComponent } from './public.index';


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


@NgModule({
    imports: [ RouterModule.forChild(dashboardRoutes) ],
    exports: [ RouterModule ]
})
export class _PUBLIC_ROUTES {}





// export const _DASHBOARD_ROUTES = RouterModule.forChild(dashboardRoutes);

