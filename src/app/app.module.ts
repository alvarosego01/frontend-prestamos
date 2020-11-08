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
import { NotifyService, SearchService, SessionService, UserService } from './services/services.index';



import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { GlobalModule } from './components/global/global.module';
import { _PUBLIC_ROUTES } from './pages/public/public.routes';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { _APP_ROUTES } from './app.routes';


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
    // _PUBLIC_ROUTES,
    _APP_ROUTES,
    DashboardModule,
    PublicModule,



  ],
  providers: [
    MessageService,
    NotifyService,
    SessionService,
    UserService,
    SearchService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
