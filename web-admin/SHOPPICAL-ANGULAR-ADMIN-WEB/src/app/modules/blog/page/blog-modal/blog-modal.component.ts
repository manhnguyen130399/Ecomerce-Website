import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseModalComponent } from '@app/modules/common/base-modal-component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Blog } from '../../models/Blog';
import { BlogService } from '../../services/blog.service';
import { FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { UtilitiesService } from '@app/core/services/utilities/utilities.service';
@Component({
  selector: 'app-blog-modal',
  templateUrl: './blog-modal.component.html',
  styleUrls: ['./blog-modal.component.css'],
})
export class BlogModalComponent
  extends BaseModalComponent<Blog>
  implements OnInit {
  @Input() blog: Blog;
  @Input() isVisible = false;
  @Input() modalTitle = 'Update state';
  states: string[];
  isLoading = true;
  isAdmin: boolean;
  @Output() cancelModalEvent = new EventEmitter<string>();
  @Output() okModalEvent = new EventEmitter<Blog>();
  constructor(
    private readonly blogService: BlogService,
    private readonly formBuilder: FormBuilder,
    private readonly utilitiesService: UtilitiesService,
    private readonly messageService: NzMessageService
  ) {
    super(blogService);
  }

  ngOnInit(): void {
    this.isAdmin = this.utilitiesService.getRole() === 'Admin';
    this.getBlogState();
    this.buildForm();
  }

  submitForm() {
    this.blogService
      .update(this.blog.id, this.blog)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((res) => {
        if ((res.code = 'OK')) {
          this.cancelModal();
          this.messageService.create(
            'success',
            'Update state blog successfully!'
          );
        }
      });
  }

  cancelModal() {
    super.cancel(this.cancelModalEvent);
  }

  getBlogState() {
    return this.blogService
      .getBlogState()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((res) => {
        this.states = res.data;
      });
  }

  buildForm() {
    this.baseForm = this.formBuilder.group({
      state: [null, [Validators.required]],
    });
  }

  getStateChange(value: string): void {
    if (this.states.includes(value)) {
      this.blog.state = value;
    }
  }
}
