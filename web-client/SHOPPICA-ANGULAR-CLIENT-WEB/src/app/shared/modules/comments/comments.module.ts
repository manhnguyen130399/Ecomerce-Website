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


@NgModule({
  declarations: [CommentsComponent],
  imports: [
    CommonModule,
    NzPaginationModule,
    NzCommentModule,
    NzIconModule,
    NzAvatarModule,
    FormsModule,
    NzInputModule
  ],
  exports: [
    CommentsComponent
  ]
})
export class CommentsModule { }
