import { CartItem } from './../../../../core/model/cart-item';
import { CartItemOptions } from './../../../../shared/modules/cart-item/models/cart-item-options.model';
import { Blog } from './../../../../core/model/blog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

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
  ]

  listCartItem: CartItem[] = [
    {
      id: 1,
      productName: "T-shirt product",
      price: 99,
      image: '/assets/images/products/product-2.jpg',
      quantity: 12,
    },
    {
      id: 2,
      productName: "T-shirt product",
      price: 99,
      image: '/assets/images/products/product-3.jpg',
      quantity: 12,
    },
    {
      id: 3,
      productName: "T-shirt Top",
      price: 99,
      image: '/assets/images/products/product-1.jpg',
      quantity: 12,
    },
  ]
  cartItemOptions: CartItemOptions = {
    showPrice: true,
    size: 'small'
  }
  constructor() { }

  ngOnInit(): void {
  }

}
