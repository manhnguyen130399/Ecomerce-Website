import { AuthGuard } from './../../core/guards/auth.guard';
import { LoginComponent } from './page/login/login.component';
import { AddressComponent } from './components/address/address.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccountComponent } from './page/account/account.component';
import { Routes } from '@angular/router';
import { ResetPasswordComponent } from './page/reset-password/reset-password.component';
export const accountRoutes: Routes = [
  {
    path: '',
    component: AccountComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'addresses',
        component: AddressComponent
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      }
    ]
  },
  {
    path: 'reset',
    component: ResetPasswordComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
]
