import { AllProductComponent } from './pages/all-product/all-product.component';
import { StoreInfoComponent } from './pages/store-info/store-info.component';
import { IndexComponent } from './pages/index/index.component';
import { Routes } from '@angular/router';
import { HomeStoreComponent } from './pages/home-store/home-store.component';
export const storeRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'home/:id',
        component: HomeStoreComponent,
        data: {
          title: 'Store'
        },
      },
      {
        path: 'info/:id',
        component: StoreInfoComponent,
        data: {
          title: 'Store Info'
        },
      },
      {
        path: 'allProduct/:id',
        component: AllProductComponent,
        data: {
          title: 'Store Products'
        },
      }
    ]
  },
  {
    path: '/store',
    pathMatch: 'full',
    redirectTo: 'store/home',
  },

];
