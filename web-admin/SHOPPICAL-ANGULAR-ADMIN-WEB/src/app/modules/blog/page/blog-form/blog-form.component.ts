import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '@env';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
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
  loading = false;
  avatarUrl?: string;
  backEndUrl = `${environment.productServiceUrl}/api/upload`;
  blog: Blog = {
    id: null,
    title: null,
    content: null,
    summary: null,
    image: null,
    category: null,
    author: null,
    createdAt: null,
    state: null
  }
  types: string[];
  constructor(
    private readonly blogService: BlogService,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.getBlogTypes();
    this.buildForm();
  }

  buildForm() {
    this.baseForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      summary: [null, [Validators.required]],
      content: [null, [Validators.required]],
      image: [null],
      category: [null, [Validators.required]]
    });

    this.baseForm.disable();
  }

  getBlogTypes() {
    this.blogService.getBlogTypes().subscribe((res) => {
      this.types = res.data
    })
  }

  submitForm() {
    this.blog.title = this.baseForm.get('title').value;
    this.blog.content = this.baseForm.get('content').value;
    this.blog.summary = this.baseForm.get('summary').value;
    this.isLoadingButtonSubmit = true;
    this.blogService
      .create(this.blog)
      .pipe(finalize(() => (this.isLoadingButtonSubmit = false)))
      .subscribe((res) => {
        if (res.code == 'OK') {
          this.messageService.create('success', `Create blog successfully!`);
          this.baseForm.reset();
        }
      });
  }

  getTypeChange(value: string): void {
    if (this.types.includes(value)) {
      this.blog.category = value
    }
  }

  handleChange(info: NzUploadChangeParam): void {
    // if (info.file.status === 'done') {
    //   // console.log(info.file.response.data[0]);
    //   this.blog.image = info.file.response.data[0];
    // }

    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
      case 'error':
        this.loading = false;
        break;
    }
  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }
}
