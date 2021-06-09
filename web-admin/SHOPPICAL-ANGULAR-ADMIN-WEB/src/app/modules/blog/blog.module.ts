import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogListComponent } from './page/blog-list/blog-list.component';
import { SharedModule } from '@shared/shared.module';
import { blogRoutes } from './blog.routing';
import { RouterModule } from '@angular/router';
import { BlogFormComponent } from './page/blog-form/blog-form.component';
import { QuillModule } from 'ngx-quill';
import { BlogViewComponent } from './page/blog-view/blog-view.component'
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzImageModule } from 'ng-zorro-antd/image';

@NgModule({
  declarations: [
    BlogListComponent,
    BlogFormComponent,
    BlogViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NzUploadModule,
    NzImageModule,
    QuillModule.forRoot(),
    RouterModule.forChild(blogRoutes)
  ]
})
export class BlogModule {

}
