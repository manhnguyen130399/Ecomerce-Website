import { UpdateStoreInfoComponent } from './page/update-store-info/update-store-info.component';
import { ChangePasswordComponent } from './page/change-password/change-password.component';
import { Routes } from '@angular/router';
import { UpdateInfoComponent } from './page/update-info/update-info.component';
export const profileRoutes: Routes = [
  {
    path: 'seller-info',
    component: UpdateInfoComponent
  },
  {
    path: 'store-info',
    component: UpdateStoreInfoComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: '',
    pathMatch: 'full',
    component: UpdateInfoComponent
  },
]
