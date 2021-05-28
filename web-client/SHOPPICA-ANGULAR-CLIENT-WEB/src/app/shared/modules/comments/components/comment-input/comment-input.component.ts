import { CommentCreateRequest } from './../../../../../core/model/comment/comment-create-request';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from './../../../../../core/services/comment/comment.service';
import { finalize } from 'rxjs/operators';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment-input',
  templateUrl: './comment-input.component.html',
  styleUrls: ['./comment-input.component.css']
})
export class CommentInputComponent implements OnInit {

  isLoading = false;
  blogId: number;
  @Input() content: string;
  @Input() commentId: number;
  @Output() addNewCommentEvent = new EventEmitter<Comment>();
  @Output() editCommentEvent = new EventEmitter<Comment>();
  constructor(
    private readonly commentService: CommentService,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.blogId = params.blogId;
    });
  }

  commentChange() {
    this.isLoading = true;
    this.commentId ? this.editComment() : this.addComment();
  }

  addComment() {
    const request: CommentCreateRequest = {
      blogId: this.blogId,
      content: this.content,
    }

    this.commentService.comment(request).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe((res) => {
      if (res.code = 'OK') {
        this.content = '';
        this.addNewCommentEvent.emit(res.data);
      }
    });
  }

  editComment() {
    this.commentService.editComment(this.commentId, this.content).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe((res) => {
      if (res.code == 'OK') {
        this.editCommentEvent.emit(res.data);
      }
    });
  }

}
