import { StoreInfoComponent } from '@modules/auth/page/store-info/store-info.component';
import { SellerInfoComponent } from '@modules/auth/page/seller-info/seller-info.component';
import { Routes } from '@angular/router';

import { LoginComponent } from '@modules/auth/page/login/login.component';
import { RegisterComponent } from '@modules/auth/page/register/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent,
        children: [
          {
            path: 'step-1',
            component: SellerInfoComponent
          },
          {
            path: 'step-2',
            component: StoreInfoComponent
          }
        ]
      }
    ]
  }
];
