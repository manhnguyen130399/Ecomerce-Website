import { AdminGuard } from './../../core/guards/admin.guard';
import { Routes } from '@angular/router';
import { StoreListComponent } from '../store/page/store-list/store-list.component';

export const storeRoutes: Routes = [
  {
    path: '',
    component: StoreListComponent,
    canActivate: [AdminGuard]
  }
]
