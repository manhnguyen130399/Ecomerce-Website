import { LoaderService } from '@shared/modules/loader/loader.service';

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BlogService } from '@core/services/blog/blog.service';
import { Blog } from '@core/model/blog/blog';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit {

  listBlog: Blog[];
  pageIndex = 1;
  pageSize = 6;
  total = 1;
  constructor(
    private readonly blogService: BlogService,
    private readonly router: Router,
    private readonly loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.loadDataBlogs(this.pageIndex, this.pageSize, null);
  }

  loadDataBlogs(pageIndex: number, pageSize: number, type: string) {
    this.loaderService.showLoader('blog');
    this.blogService.getAllBlog(pageIndex, pageSize, type).pipe(
      finalize(() => this.loaderService.hideLoader('blog'))
    ).subscribe((res) => {
      this.listBlog = res.data.content;
      this.total = res.data.totalElements;
    });
  }

  onQueryPageIndexChange(event) {
    this.loadDataBlogs(event, this.pageSize, null);
  }

  viewItem(id: number) {
    this.router.navigate(['/blog/detail/', id]);
  }

  viewBlogByCategory(item: string) {
    const last = item.indexOf(' '); // remove Quantity
    this.loadDataBlogs(this.pageIndex, this.pageSize, item.substring(0, last));
  }
}
