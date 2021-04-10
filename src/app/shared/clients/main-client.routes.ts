
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent} from '../../pages/dashboard/dashboard.index';
import { ClientHandlerComponent } from '../clients/client-handler/client-handler.component';

export const clientRoutes: Routes = [
      {
        path: '',
        component: ClientHandlerComponent,
      },
        {
          path: '**',
          component: ProfileComponent,
        }
  ];

@NgModule({
    imports: [ RouterModule.forChild(clientRoutes) ],
    exports: [ RouterModule ]
})
// tslint:disable-next-line: class-name
export class _CLIENT_ROUTES {}
