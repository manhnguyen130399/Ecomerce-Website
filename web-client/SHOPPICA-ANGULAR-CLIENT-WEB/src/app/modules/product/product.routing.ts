import { WishListComponent } from './page/wish-list/wish-list.component';
import { ProductDetailComponent } from './page/product-detail/product-detail.component';
import { ProductComponent } from './page/product/product.component';
import { Routes } from '@angular/router';
export const productRoutes: Routes = [
  {
    path: 'collection/:category',
    component: ProductComponent
  },
  {
    path: 'detail/:productId',
    component: ProductDetailComponent
  },
  {
    path: 'wishlist',
    component: WishListComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'collection/all',
  },
]
