import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { shareIcons } from './../../shared/share-icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CartItemModule } from './../../shared/modules/cart-item/cart-item.module';
import { HeaderPageModule } from './../../shared/modules/header-page/header-page.module';
import { BlogCardModule } from './../../shared/modules/blog-card/blog-card.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { blogRoutes } from './blog.routing';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BlogListComponent } from './page/blog-list/blog-list.component';
import { BlogDetailComponent } from './page/blog-detail/blog-detail.component';
import { CommentsComponent } from './components/comments/comments.component';
import { LeaveCommentComponent } from './components/leave-comment/leave-comment.component';



@NgModule({
  declarations: [SidebarComponent, BlogListComponent, BlogDetailComponent, CommentsComponent, LeaveCommentComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BlogCardModule,
    HeaderPageModule,
    CartItemModule,

    NzGridModule,
    NzCommentModule,
    NzAvatarModule,
    NzInputModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule.forChild(shareIcons),

    RouterModule.forChild(blogRoutes)
  ]
})
export class BlogModule { }
