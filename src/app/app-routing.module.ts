import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { _DASHBOARD_ROUTES } from './pages/dashboard/dashboard.routes';
import { _ADMIN_ROUTES } from './pages/dashboard/roles/admin/admin.routes';


// Modulos
// import { PagesRoutingModule } from './pages/pages.routing';
// import { AuthRoutingModule } from './auth/auth.routing';

// import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { LoginComponent, RegisterComponent } from './pages/public/public.index';
import { _PUBLIC_ROUTES } from './pages/public/public.routes';
import { noLoginVerifyGuard } from './services/guards/guards.index';


const routes: Routes = [


{ path: '**', component: LoginComponent },
{ path: '', component: LoginComponent }

];



@NgModule({
  imports: [
    RouterModule.forRoot( routes, { useHash: false } ),
    _PUBLIC_ROUTES,
    _DASHBOARD_ROUTES,
    // _ADMIN_ROUTES
    // PagesRoutingModule,
    // AuthRoutingModule

  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
