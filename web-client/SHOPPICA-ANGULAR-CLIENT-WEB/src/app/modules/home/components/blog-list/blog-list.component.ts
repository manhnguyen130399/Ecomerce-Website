import { BlogService } from '@core/services/blog/blog.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Blog } from '../../../../core/model/blog/blog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  constructor(private readonly blogService: BlogService) { }
  listBlog: Blog[] = [];

  customOptions: OwlOptions = {
    loop: true,
    autoplay: false,
    dots: false,
    autoHeight: false,
    autoWidth: true,
    skip_validateItems: true,
    responsive: {
      300: {
        items: 1
      },
      500: {
        items: 2
      },
      600: {
        items: 2
      },
      768: {
        items: 3
      }
    },
    nav: true,
    navText: ['<', '>']
  };

  ngOnInit(): void {
    this.blogService.getAllBlog(1, 6).subscribe(res => {
      if (res.code === 'OK') {
        this.listBlog = res.data.content;
      }
    });
  }
}
