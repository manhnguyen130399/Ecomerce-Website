import { Blog } from '../../../../core/model/blog/blog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  blog =
    {
      id: 1,
      image: "/assets/images/blogs/blog-2.jpg",
      content: "Typography is the work of typesetters, compositors, typographers, graphic designers, art directors, manga artists, ",
      author: "Admin",
      created_at: new Date(),
      title: "The Easiest Way to Break Out on Top"
    }


  listBlog: Blog[] = [
    this.blog,
    this.blog,
    this.blog,
    this.blog,
    this.blog,
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
