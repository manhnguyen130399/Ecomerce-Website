import { AddressPageComponent } from './components/addresses/address-page/address-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccountComponent } from './page/account/account.component';
import { Routes } from '@angular/router';
export const accountRoutes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'addresses',
        component: AddressPageComponent
      }
    ]
  }
]
