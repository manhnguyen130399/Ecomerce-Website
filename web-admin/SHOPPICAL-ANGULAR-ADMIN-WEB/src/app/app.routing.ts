import { AuthGuard } from '@core/guards/auth.guard';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from '@layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from '@layout/main-layout/main-layout.component';
export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'size',
        loadChildren: () =>
          import('./modules/size/size.module').then((m) => m.SizeModule),
      },
      {
        path: 'category',
        loadChildren: () =>
          import('./modules/category/category.module').then((m) => m.CategoryModule),
      },
      {
        path: 'color',
        loadChildren: () =>
          import('./modules/color/color.module').then((m) => m.ColorModule),
      },
      {
        path: 'brand',
        loadChildren: () =>
          import('./modules/brand/brand.module').then((m) => m.BrandModule),
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/login',
  },
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' }
];
