import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveCommentComponent } from './leave-comment.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [LeaveCommentComponent],
  imports: [
    CommonModule,
    NzInputModule,
    NzPaginationModule,
    FormsModule

  ],
  exports: [
    LeaveCommentComponent
  ]
})
export class LeaveCommentModule { }
