import { formatDistance } from 'date-fns';
import { Blog } from '@core/model/blog/blog';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from '@core/model/comment/comment';
import { BlogService } from '@core/services/blog/blog.service';
@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
})
export class BlogDetailComponent implements OnInit {
  blog: Blog = {
    id: null,
    summary: null,
    title: null,
    author: null,
    createdAt: null,
    content: null,
    image: null,
    comments: null
  }

  constructor(private readonly blogService: BlogService, private readonly route: ActivatedRoute, private readonly router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getBlogById(params.id);
    });
  }

  getBlogById(id: number) {
    this.blogService.getBlogById(id).subscribe((res) => {
      const data = res.data;
      this.blog = data;
    })
  }

  viewBlogByCategory(value: string) {
    // when view tags --> redirect blog page
    this.router.navigate(['/blog']);
  }

  appendComment(value: Comment) {
    this.blog.comments.unshift(value)
  }

}
