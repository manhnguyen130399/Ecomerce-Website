import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from './../../../../../core/services/auth/auth.service';
import { CommentService } from './../../../../../core/services/comment/comment.service';
import { JwtService } from './../../../../../core/services/jwt/jwt.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from '@core/model/comment/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment;
  @Output() deleteCommentEvent = new EventEmitter<number>();
  accountId: number;
  timeLike = 0;
  timeDislike = 0;
  isShowEditInput = false;
  constructor(
    private readonly jwtService: JwtService,
    private readonly commentService: CommentService,
    private readonly authService: AuthService,
    private readonly messageService: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.accountId = this.jwtService.getAccountId();
  }

  showEdit() {
    this.isShowEditInput = true;
  }

  editComment(comment: Comment) {
    this.comment.content = comment.content;
    this.isShowEditInput = false;
  }

  delete(id: number) {
    this.deleteCommentEvent.emit(id);
    this.commentService.deleteComment(id).subscribe((res) => {

    });
  }

  like(id: number) {
    if (this.hasLogin()) {
      if (this.timeDislike == 1) {
        this.dislike(id);
      }
      if (this.timeLike == 0) {
        this.updateLikeForComment(id, this.timeLike, true);
        this.comment.like++;
        this.timeLike = 1;
      } else {
        this.downLike(id);
      }
    }
  }

  private downLike(id: number) {
    this.updateLikeForComment(id, this.timeLike, true);
    this.comment.like--;
    this.timeLike = 0;
  }

  private updateLikeForComment(id: number, timeLike: number, isLike: boolean) {
    this.commentService.likeComment(id, timeLike, isLike).subscribe((res) => {
    });
  }

  private hasLogin() {
    if (!this.authService.isAuthenticated()) {
      this.messageService.warning("123123");
      return false;
    }
    return true;
  }

  dislike(id: number): void {
    if (this.hasLogin()) {
      if (this.timeLike == 1) {
        this.downLike(id);
      }
      if (this.timeDislike == 0) {
        this.updateLikeForComment(id, this.timeDislike, false);
        this.comment.dislike++;
        this.timeDislike = 1;
      } else {
        this.downDislike(id);
      }
    }
  }

  private downDislike(id: number) {
    this.updateLikeForComment(id, this.timeDislike, false);
    this.comment.dislike--;
    this.timeDislike = 0;
  }

}
