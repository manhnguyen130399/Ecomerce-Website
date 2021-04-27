import { OwlOptions } from 'ngx-owl-carousel-o';
import { Blog } from '../../../../core/model/blog/blog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  listBlog: Blog[] = [
    {
      id: 1,
      image: "/assets/images/blogs/blog-1.jpg",
      content: "Typography is the work of typesetters, compositors, typographers, graphic designers, art directors, manga artists, ",
      author: "Admin",
      created_at: new Date(),
      title: "The Easiest Way to Break Out on Top"
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }
  customOptions: OwlOptions = {
    loop: true,
    autoplay: false,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      300: {
        items: 1
      },
      400: {
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
  }
}
