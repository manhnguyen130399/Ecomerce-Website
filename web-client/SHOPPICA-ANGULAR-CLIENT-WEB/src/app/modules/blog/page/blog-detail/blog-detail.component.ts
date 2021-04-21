import { formatDistance } from 'date-fns';
import { Blog } from '@core/model/blog';
import { Component, OnInit, Output,  EventEmitter  } from '@angular/core';
import { BlogService } from '@modules/blog/services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    image: null

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
      this.blog = res.data
    })
  }

  viewBlogByCategory(value: string) {
    // when view tags --> redirect blog page
    this.router.navigate(['/blog']);
  }

}
