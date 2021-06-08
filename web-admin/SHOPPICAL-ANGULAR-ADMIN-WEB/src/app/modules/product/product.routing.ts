import { ProductDetailComponent } from './page/product-detail/product-detail.component';
import { ProductListComponent } from './page/product-list/product-list.component';
import { Routes } from '@angular/router';
export const productRoutes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: 'create',
    component: ProductDetailComponent,
  },
  {
    path: 'detail/:productId',
    component: ProductDetailComponent,
  }
]
