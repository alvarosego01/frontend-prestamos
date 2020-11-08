import { RouterModule, Routes } from '@angular/router';
import { noLoginVerifyGuard } from 'src/app/services/guards/guards.index';
import {
    HomeComponent,
    LoginComponent,
    RegisterComponent
} from './public.index';



// LoginVerifyGuard


const appRoutes: Routes = [
    // { path: 'home', component: HomeComponent },
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

    {
        path: '**', component: LoginComponent,
        canActivate: [noLoginVerifyGuard],
        canActivateChild: [noLoginVerifyGuard],
    },
    {
        path: '', component: LoginComponent,
        canActivate: [noLoginVerifyGuard],
        canActivateChild: [noLoginVerifyGuard],
    }
];



export const _PUBLIC_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });