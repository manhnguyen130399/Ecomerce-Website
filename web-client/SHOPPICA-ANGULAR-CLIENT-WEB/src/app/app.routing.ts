import { HomeComponent } from './modules/home/page/home/home.component';
import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./modules/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./modules/product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./modules/cart/cart.module').then(m => m.CartModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' }
];
