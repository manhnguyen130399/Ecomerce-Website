import { Blog } from './../../../../core/model/blog';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlogService } from '@modules/blog/services/blog.service';
import { Router } from '@angular/router';

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
  constructor(private readonly blogService: BlogService, private readonly router: Router) { }

  ngOnInit(): void {
    this.loadDataBlogs(this.pageIndex, this.pageSize, null);
  }

  loadDataBlogs(pageIndex: number, pageSize: number, type: string) {
    this.blogService.getAllBlog(pageIndex, pageSize, type).subscribe((res) => {
      this.listBlog = res.data.content;
      this.total = res.data.totalElements
    });
  }

  onQueryPageIndexChange(event) {
    this.loadDataBlogs(event, this.pageSize, null)
  }

  viewItem(id: number) {
    this.router.navigate(['/blog/detail/', id]);
  }

  viewBlogByCategory(item: string) {
    const last = item.indexOf(" "); // remove Quantity
    this.loadDataBlogs(this.pageIndex, this.pageSize, item.substring(0, last))
  }
}
