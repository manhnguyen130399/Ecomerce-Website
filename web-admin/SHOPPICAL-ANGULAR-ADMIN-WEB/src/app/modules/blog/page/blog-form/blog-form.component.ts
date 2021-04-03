import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs/operators';
import { Blog } from '../../models/Blog';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css'],
})
export class BlogFormComponent implements OnInit {
  baseForm: FormGroup;
  isLoadingButtonSubmit = false;
  constructor(
    private readonly blogService: BlogService,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.baseForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      summary: [null, [Validators.required]],
      content: [null, [Validators.required]],
    });
  }

  submitForm() {
    const blog: Blog = {
      id: null,
      author: null,
      createdAt: null,
      state: null,
      title: this.baseForm.get('title').value,
      content: this.baseForm.get('content').value,
      summary: this.baseForm.get('summary').value,
    };
    this.blogService
      .create(blog)
      .pipe(finalize(() => (this.isLoadingButtonSubmit = false)))
      .subscribe((res) => {
        if (res.code == 'OK') {
          this.messageService.create('success', `Create blog successfully!`);
          this.baseForm.reset();
        }
      });
  }
}
