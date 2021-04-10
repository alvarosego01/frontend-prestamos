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
  FilesService,
  ClientesService,
  FormsResourcesService,

} from './services/services/services.index';



import { GlobalModule } from './components/global/global.module';
// import { _PUBLIC_ROUTES } from './pages/public/public.routes';
import { DashboardModule } from './pages/dashboard/dashboard.module';
// import { _APP_ROUTES } from './app.routes';
import { AppRoutingModule } from './app-routing.module';




import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
// import { TokenInterceptor } from './../auth/token.interceptor';


import { ClipboardModule } from 'ngx-clipboard';

// prime NG
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import {FileUploadModule} from 'primeng/fileupload';

import { LoaderInterceptor } from './interceptor/loader.interceptor';
import { interceptorProviders } from './interceptor/interceptorProvider';



import {IMaskModule} from 'angular-imask';
import { ReactiveFormsModule } from '@angular/forms';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { environment } from 'src/environments/environment';

import { VisitsSocketService, WebSocketService } from './services/sockets/socket.index';
import { CommonModule } from '@angular/common';
const config: SocketIoConfig = {
  url: environment._SERVICE , options: {}
};

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    NavDashboardComponent
  ],
  imports: [
    CommonModule,
    IMaskModule,
    BrowserModule,
    ToastModule,
    GlobalModule,
    DialogModule,
    FileUploadModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
    // _PUBLIC_ROUTES,
    // _APP_ROUTES,
    AppRoutingModule,
    DashboardModule,
    PublicModule,
    HttpClientModule,
    ClipboardModule




  ],
  providers: [
    VisitsSocketService,
    WebSocketService,
    FormsResourcesService,
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
    FilesService,
    ClientesService
    // LoaderService,


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
