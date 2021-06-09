import { BlogViewComponent } from './page/blog-view/blog-view.component';
import { Routes } from '@angular/router';
import { BlogFormComponent } from './page/blog-form/blog-form.component';
import { BlogListComponent } from './page/blog-list/blog-list.component';

export const blogRoutes: Routes = [
  {
    path: '',
    component: BlogListComponent,
  },
  {
    path: 'view/:blogId',
    component: BlogViewComponent,
  },
  {
    path: 'create',
    component: BlogFormComponent,
  },
];
