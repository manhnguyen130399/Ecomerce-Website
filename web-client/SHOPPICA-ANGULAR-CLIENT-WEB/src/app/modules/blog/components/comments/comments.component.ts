import { formatDistance } from 'date-fns';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Comment } from '@core/model/comment';
import { CommentService } from '@core/services/comment/comment.service';
import { AuthService } from '@core/services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StorageService } from '@core/services/storage/storage.service';
import { environment } from '@env';
import { JwtService } from '@core/services/jwt/jwt.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() comments: Comment[]
  timeLike = 0;
  timeDislike = 0;
  pageSize = 3;
  pageIndex = 0;
  total = 0;
  isShow = true;
  subComments: Comment[] = [];
  content: string;
  value: number = null;
  message = " You can login. Please "
  accountId = null;
  constructor(private readonly commentService: CommentService, private readonly authService: AuthService, private readonly messageService: NzMessageService, private readonly jwtService: JwtService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.comments != undefined) {
      this.subComments = this.comments.slice(this.pageIndex, this.pageSize)
      this.accountId = this.jwtService.getAccountId();
    }
  }

  like(id: number): void {
    if (this.hasLogin()) {
      const index = this.comments.findIndex(item => id == item.id)
      if (this.timeDislike == 1) {
        this.dislike(id)
      }
      if (this.timeLike == 0) {
        this.updateLikeForComment(id, this.timeLike, true)
        this.comments[index].like++;
        this.timeLike = 1;
      } else {
        this.downLike(index, id)
      }
    }
  }

  private downLike(index: number, id: number) {
    this.updateLikeForComment(id, this.timeLike, true)
    this.comments[index].like--;
    this.timeLike = 0;
  }

  private updateLikeForComment(id: number, timeLike: number, isLike: boolean) {
    this.commentService.likeComment(id, timeLike, isLike).subscribe((res) => {
    })
  }

  private hasLogin(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.messageService.warning(this.message);
      return false;
    }
    return true;
  }

  dislike(id: number): void {
    if (this.hasLogin()) {
      const index = this.comments.findIndex(item => id == item.id)
      if (this.timeLike == 1) {
        this.downLike(index, id)
      }
      if (this.timeDislike == 0) {
        this.updateLikeForComment(id, this.timeDislike, false);
        this.comments[index].dislike++
        this.timeDislike = 1;
      } else {
        this.downDislike(index, id)
      }
    }
  }

  private downDislike(index: number, id: number) {
    this.updateLikeForComment(id, this.timeDislike, false)
    this.comments[index].dislike--
    this.timeDislike = 0;
  }

  onQueryPageIndexChange(event) {
    this.total = this.comments.length;
    this.subComments = this.comments.slice((event - 1) * this.pageSize, this.comments.length > this.pageSize ? this.pageSize * event : this.comments.length);
  }

  delete(id: number) {
    this.commentService.deleteComment(id).subscribe((res) => {
      if (res.code == "OK") {
        this.subComments = this.subComments.filter(item => item.id != id);
      } else {
        this.messageService.warning(' You can not delete comment ');
      }
    })
  }

  showEdit(id: number, content: string) {
    this.isShow = !this.isShow
    this.value = id;
    this.content = content
  }

  edit(id: number) {
    const index = this.comments.findIndex(item => id == item.id)
    this.commentService.editComment(id, this.content).subscribe((res) => {
      if (res.code == "OK") {
        this.subComments[index] = res.data
        this.isShow = !this.isShow
      } else {
        this.messageService.error(" You can not edit comment ");
      }
    })
  }
}
