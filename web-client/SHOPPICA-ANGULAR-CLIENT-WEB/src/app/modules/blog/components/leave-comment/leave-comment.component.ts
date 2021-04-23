import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import { CommentService } from '@core/services/comment/comment.service';
import { Comment } from '@core/model/comment';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-leave-comment',
  templateUrl: './leave-comment.component.html',
  styleUrls: ['./leave-comment.component.css']
})
export class LeaveCommentComponent implements OnInit {

  // writeBlogCommentForm: FormGroup;
  content: string;
  isLoading = false;
  @Input() blogId: number;
  @Output() newComment = new EventEmitter<Comment>();
  constructor(private readonly authService: AuthService, private readonly commentService: CommentService, private readonly messageService: NzMessageService) { }

  ngOnInit(): void {
  }

  comment() {
    if (!this.authService.isAuthenticated()) {
      this.messageService.warning(" You can login. Please ")
    } else {
      this.commentService.comment(null, this.blogId, this.content).subscribe((res) => {
        if (res.code = "OK") {
          this.content = ''
          this.newComment.emit(res.data)
        }
      })
    }
  }
}
