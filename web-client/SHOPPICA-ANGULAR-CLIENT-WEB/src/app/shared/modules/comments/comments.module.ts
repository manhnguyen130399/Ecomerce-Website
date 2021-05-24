import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { shareIcons } from '../../share-icon';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommentComponent } from './components/comment/comment.component';
import { CommentInputComponent } from './components/comment-input/comment-input.component';


@NgModule({
  declarations: [CommentsComponent, CommentComponent, CommentInputComponent],
  imports: [
    CommonModule,
    NzPaginationModule,
    NzCommentModule,
    NzIconModule,
    NzAvatarModule,
    FormsModule,
    NzInputModule,
    NzIconModule.forChild(shareIcons),
  ],
  exports: [
    CommentsComponent
  ]
})
export class CommentsModule { }
