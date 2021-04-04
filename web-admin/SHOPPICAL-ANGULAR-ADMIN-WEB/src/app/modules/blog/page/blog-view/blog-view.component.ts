import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseModalComponent } from '@app/modules/common/base-modal-component';
import { Blog } from '../../models/Blog';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css'],
})
export class BlogViewComponent
  extends BaseModalComponent<Blog>
  implements OnInit {
  @Input() blog: Blog;
  @Input() isVisible = false;
  @Input() modalTitle = 'View Blog';
  states: string[];
  isLoading = true;
  @Output() cancelModalEvent = new EventEmitter<string>();
  @Output() okModalEvent = new EventEmitter<Blog>();

  constructor(private readonly blogService: BlogService) {
    super(blogService);
  }

  ngOnInit(): void {
  }

  cancelViewBlog() {
    this.isVisible = false;
    this.cancelModalEvent.emit();
  }
}
