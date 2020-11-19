import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';


import { FooterComponent } from './components/shared/footer/footer.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { NavDashboardComponent } from './components/shared/nav-dashboard/nav-dashboard.component';



// importación de modulos
import { PublicModule } from './pages/public/public.module';
// import { ServicesModule } from './services/services.module';


// import { ServicesModule } from './services/services.module';

import { BrowserModule } from '@angular/platform-browser';
import {
  AdminService,
  CobradorService,
  PermisionsService,
  RolesService,
  RouterService,
  GlobalService,
  NotifyService,
  SessionService,
  SearchService,
  UserService,
  LoaderService,

} from './services/services.index';



import { GlobalModule } from './components/global/global.module';
// import { _PUBLIC_ROUTES } from './pages/public/public.routes';
import { DashboardModule } from './pages/dashboard/dashboard.module';
// import { _APP_ROUTES } from './app.routes';
import { AppRoutingModule } from './app-routing.module';




import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
// import { TokenInterceptor } from './../auth/token.interceptor';


// prime NG
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import { LoaderInterceptor } from './interceptor/loader.interceptor';
import { interceptorProviders } from './interceptor/interceptorProvider';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    NavDashboardComponent,

  ],
  imports: [
    BrowserModule,
    ToastModule,
    GlobalModule,
    DialogModule,
    // _PUBLIC_ROUTES,
    // _APP_ROUTES,
    AppRoutingModule,
    DashboardModule,
    PublicModule,
    HttpClientModule



  ],
  providers: [

    interceptorProviders,
    MessageService,
    AdminService,
    CobradorService,
    PermisionsService,
    RolesService,
    RouterService,
    GlobalService,
    NotifyService,
    SessionService,
    SearchService,
    UserService,
    // LoaderService,


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
