import { map } from 'rxjs/operators';
import { ProductService } from './../../../../core/services/product/product.service';

import { CartItemOptions } from '@shared/modules/cart-item/models/cart-item-options.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '@core/services/blog/blog.service';
import { CartItem } from '@core/model/cart/cart-item';
import { Blog } from '@core/model/blog/blog';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  listBlog: Blog[];
  categories: string[];

  bestSellerProducts: CartItem[] = [
    {
      id: 1,
      productName: 'T-shirt product',
      price: 99,
      image: '/assets/images/products/product-2.jpg',
      quantity: 12,
    },
    {
      id: 2,
      productName: 'T-shirt product',
      price: 99,
      image: '/assets/images/products/product-3.jpg',
      quantity: 12,
    },
    {
      id: 3,
      productName: 'T-shirt Top',
      price: 99,
      image: '/assets/images/products/product-1.jpg',
      quantity: 12,
    },
  ];
  cartItemOptions: CartItemOptions = {
    showPrice: true,
    size: 'small'
  };

  constructor(
    private readonly blogService: BlogService,
    private readonly router: Router,
    private readonly productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loadDataForSideBar();
    this.loadBestSellerProduct();
  }

  loadBestSellerProduct() {
    this.productService.getProductBestSellerByStore(3).subscribe(res => {
      if (res.code === 'OK') {
        this.bestSellerProducts = res.data.map(p => {
          return {
            productId: p.id,
            productName: p.productName,
            price: p.price,
            image: p.productImages[0]?.image,
          }
        });
      }
    });
  }

  loadDataForSideBar() {
    this.blogService.getDataForSideBlog().subscribe((res) => {
      this.listBlog = res.data.blogRecents;
      this.categories = res.data.categories;
    });
  }

  viewItem(id: number) {
    this.router.navigate(['/blog/detail/', id]);
  }

  filterChange(value: string) {
    const categoryName = value.split(' ')[0];
    this.router.navigate(['/blog'],
      {
        queryParams: {
          category: categoryName
        },
        queryParamsHandling: 'merge'
      });
  }

}
