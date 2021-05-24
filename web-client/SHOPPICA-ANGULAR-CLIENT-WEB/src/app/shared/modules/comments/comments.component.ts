import { ShareService } from './../../../core/services/share/share.service';
import { formatDistance } from 'date-fns';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Comment } from '@core/model/comment/comment';
import { CommentService } from '@core/services/comment/comment.service';
import { AuthService } from '@core/services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StorageService } from '@core/services/storage/storage.service';
import { environment } from '@env';
import { JwtService } from '@core/services/jwt/jwt.service';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() comments: Comment[];
  pageSize = 3;
  pageIndex = 1;
  customerImage: string;
  subComments: Comment[] = [];

  isAuthenticated = false;
  constructor(
    private readonly commentService: CommentService,
    private readonly authService: AuthService,
    private readonly messageService: NzMessageService,
    private readonly shareService: ShareService
  ) {
  }

  ngOnInit(): void {
    this.shareService.loginSuccessEmitted$.subscribe(isLogin => {
      this.isAuthenticated = isLogin;
    })

    this.isAuthenticated = this.authService.isAuthenticated();

    this.shareService.customerInfoEmitted$.subscribe(data => {
      this.customerImage = data.image;
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.comments != undefined) {
      this.loadCurrentComments();

    }
  }

  loadCurrentComments() {
    this.subComments = this.comments.slice((this.pageIndex - 1) * this.pageSize, this.pageIndex * this.pageSize);
  }

  addNewComment(comment: Comment) {
    this.comments = [
      comment,
      ...this.comments
    ]
    this.loadCurrentComments();
  }

  deleteComment(id: number) {
    this.comments = this.comments.filter(item => item.id != id);
    this.loadCurrentComments();
  }

  onQueryPageIndexChange(event) {
    this.pageIndex = event;
    this.loadCurrentComments();
  }
}
