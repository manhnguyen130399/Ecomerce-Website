import { AuthGuard } from '@core/guards/auth.guard';
import { Routes } from '@angular/router';
import { MainLayoutComponent } from '@layout/main-layout/main-layout.component';
import { DashboardComponent } from './../dashboard/page/dashboard/dashboard.component';
import { blogRoutes } from '../blog/blog.routing';

export const mainRoutes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        // component: DashboardComponent,
        loadChildren: () =>
          import('../dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'size',
        loadChildren: () =>
          import('../size/size.module').then((m) => m.SizeModule),
      },
      {
        path: 'category',
        loadChildren: () =>
          import('../category/category.module').then((m) => m.CategoryModule),
      },
      {
        path: 'color',
        loadChildren: () =>
          import('../color/color.module').then((m) => m.ColorModule),
      },
      {
        path: 'brand',
        loadChildren: () =>
          import('../brand/brand.module').then((m) => m.BrandModule),
      },
      {
        path: 'promotion',
        loadChildren: () =>
          import('../promotion/promotion.module').then(
            (m) => m.PromotionModule
          ),
      },
      {
        path: 'complain',
        loadChildren: () =>
          import('../complain/complain.module').then((m) => m.ComplainModule),
      },
      {
        path: 'store',
        loadChildren: () =>
          import('../store/store.module').then((m) => m.StoreModule),
      },
      {
        path: 'product',
        loadChildren: () =>
          import('../product/product.module').then((m) => m.ProductModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'order',
        loadChildren: () =>
          import('../order/order.module').then((m) => m.OrderModule),
      },
      {
        path: 'blog',
        loadChildren: () =>
          import('../blog/blog.module').then((m) => m.BlogModule),
      },
    ],
  },
];
