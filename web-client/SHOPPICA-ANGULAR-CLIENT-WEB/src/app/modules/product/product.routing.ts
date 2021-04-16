import { WishListComponent } from './wish-list/wish-list.component';
import { ProductDetailComponent } from './page/product-detail/product-detail.component';
import { ProductComponent } from './page/product/product.component';
import { Routes } from '@angular/router';
export const productRoutes: Routes = [
  {
    path: '',
    component: ProductComponent
  },
  {
    path: 'detail',
    component: ProductDetailComponent
  },
  {
    path: 'wishlist',
    component: WishListComponent
  }
]
