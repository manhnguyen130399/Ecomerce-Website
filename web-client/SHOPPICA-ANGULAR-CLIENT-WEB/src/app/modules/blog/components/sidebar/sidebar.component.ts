import { CartItem } from './../../../../core/model/cart-item';
import { CartItemOptions } from './../../../../shared/modules/cart-item/models/cart-item-options.model';
import { Blog } from './../../../../core/model/blog';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '@core/services/blog/blog.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  listBlog: Blog[];
  categories: string[];
  @Output() newItemEvent = new EventEmitter<string>();

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
  constructor(private readonly blogService: BlogService, private readonly router: Router) { }

  ngOnInit(): void {
    this.loadDataForSideBar()
  }

  loadDataForSideBar() {
    this.blogService.getDataForSideBlog().subscribe((res) => {
      this.listBlog = res.data.blogRecents;
      this.categories = res.data.categories;
    })
  }

  viewItem(id: number) {
    this.router.navigate(['/blog/detail/', id]);
  }

  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }

}
