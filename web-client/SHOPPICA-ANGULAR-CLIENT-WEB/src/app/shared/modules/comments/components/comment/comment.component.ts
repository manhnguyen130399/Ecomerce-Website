import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from './../../../../../core/services/auth/auth.service';
import { CommentService } from './../../../../../core/services/comment/comment.service';
import { JwtService } from './../../../../../core/services/jwt/jwt.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from '@core/model/comment/comment';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment;
  @Output() deleteCommentEvent = new EventEmitter<number>();
  accountId: number;
  isShowEditInput = false;
  isProductComment = false;
  constructor(
    private readonly jwtService: JwtService,
    private readonly commentService: CommentService,
    private readonly authService: AuthService,
    private readonly messageService: NzMessageService,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params.productId) {
        this.isProductComment = true;
      }
    })
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

  async like(id: number) {
    const res = await this.commentService.checkInteractive(id);

    const liked = res["data"]["liked"];
    const disliked = res["data"]["disliked"];

    if (this.hasLogin()) {
      this.updateLikeForComment(id, true);
      if (!liked) {
        this.comment.like++;
      } else {
        this.comment.like--;
      }
      if (disliked) {
        this.comment.dislike--;
      }
    }
  }



  private updateLikeForComment(id: number, isLike: boolean) {
    this.commentService.likeComment(id, isLike).subscribe((res) => {
    });
  }

  private hasLogin() {
    if (!this.authService.isAuthenticated()) {
      this.messageService.warning("Login... please!");
      return false;
    }
    return true;
  }

  async dislike(id: number) {
    const res = await this.commentService.checkInteractive(id);
    const liked = res["data"]["liked"];
    const disliked = res["data"]["disliked"];
    if (this.hasLogin()) {
      this.updateLikeForComment(id, false);
      if (!disliked) {
        this.comment.dislike++;
      } else {
        this.comment.dislike--;
      }
      if (liked) {
        this.comment.like--;
      }
    }
  }

}
