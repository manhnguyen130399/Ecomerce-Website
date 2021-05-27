import { NzMessageService } from 'ng-zorro-antd/message';
import { CommentCreateRequest } from './../../../../core/model/comment/comment-create-request';
import { finalize } from 'rxjs/operators';
import { CommentService } from '@core/services/comment/comment.service';
import { OrderDetailResponse } from './../../../../core/model/order/order-detail-response';
import { Product } from '@core/model/product/product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  @Input() orderDetail: OrderDetailResponse;
  @Input() isVisible: boolean;
  @Output() isVisibleChange = new EventEmitter<boolean>();
  reviewForm: FormGroup;
  isLoading = false;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly commentService: CommentService,
    private readonly messageService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.reviewForm = this.formBuilder.group({
      content: [null, Validators.required],
      rating: [0, Validators.required]
    })
  }

  handleCancel() {
    this.isVisibleChange.emit(false);
  }

  sendReview() {
    const request: CommentCreateRequest = {
      ...this.reviewForm.value,
      productId: this.orderDetail.productId,
    }

    console.log(this.reviewForm.value)
    this.isLoading = true;
    this.commentService.comment(request).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe((res) => {
      if (res.code = 'OK') {
        this.isVisibleChange.emit(false);
        this.messageService.success('Add review successfully!');
      }
    });
  }

}
