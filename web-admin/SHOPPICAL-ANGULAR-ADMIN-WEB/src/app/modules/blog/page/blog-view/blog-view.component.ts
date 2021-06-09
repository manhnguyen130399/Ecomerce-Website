import { finalize } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseModalComponent } from '@app/modules/common/base-modal-component';
import { Blog } from '../../models/Blog';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css'],
})
export class BlogViewComponent {
  blog: Blog;
  states: string[];
  isLoading = false;
  isLoadingStatusUpdate = false;
  constructor(
    private readonly blogService: BlogService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly messageService: NzMessageService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getBlogById(params.blogId);
    });
    this.getBlogState();
  }

  getBlogById(id: number) {
    this.isLoading = true;
    this.blogService.getBlogById(id).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe((res) => {
      const data = res.data;
      this.blog = data;
    });
  }


  getBlogState() {
    return this.blogService.getBlogState().subscribe((res) => {
      this.states = res.data;
    });
  }

  updateStatus(value: string): void {
    this.isLoadingStatusUpdate = true;
    this.blogService.update(this.blog.id, this.blog)
      .pipe(finalize(() => this.isLoadingStatusUpdate = false))
      .subscribe((res) => {
        if ((res.code = 'OK')) {
          this.messageService.create(
            'success',
            'Update state blog successfully!'
          );
        }
      });
  }
}
