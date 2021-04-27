import { formatDistance } from 'date-fns';
import { Blog } from '@core/model/blog/blog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {


  blog: Blog =
    {
      id: 1,
      image: "/assets/images/blogs/blog-background.jpg",
      content: "Typography is the work of typesetters, compositors, typographers, graphic designers, art directors, manga artists, ",
      author: "Admin",
      created_at: new Date(),
      title: "The Easiest Way to Break Out on Top"
    }
  constructor() { }

  ngOnInit(): void {
  }



}
