import { RouterModule, Routes } from '@angular/router';
import { noLoginVerifyGuard } from 'src/app/services/guards/guards.index';
import { LoginComponent, RegisterComponent } from './pages/public/public.index';



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

    { path: '**', component: LoginComponent },
    { path: '', component: LoginComponent }
];



export const _APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });