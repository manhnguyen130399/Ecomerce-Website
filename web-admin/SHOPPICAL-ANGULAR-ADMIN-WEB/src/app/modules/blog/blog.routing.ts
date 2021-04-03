import { Routes } from '@angular/router';
import { BlogFormComponent } from './page/blog-form/blog-form.component';
import { BlogListComponent } from './page/blog-list/blog-list.component';
import { BlogModalComponent } from './page/blog-modal/blog-modal.component';

export const blogRoutes: Routes = [
  {
    path: '',
    component: BlogListComponent,
  },
  {
    path: 'create',
    component: BlogFormComponent,
  },
];
