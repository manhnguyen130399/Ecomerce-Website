import { ProductService } from '@core/services/product/product.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '@core/model/product/product';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-product-trending',
  templateUrl: './product-trending.component.html',
  styleUrls: ['./product-trending.component.css']
})
export class ProductTrendingComponent implements OnInit {

  constructor(private readonly productService: ProductService) { }
  listProduct: Product[] = [];

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    dots: true,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      400: {
        items: 2
      },
      600: {
        items: 3
      },
      768: {
        items: 4
      }
    },
    nav: true,
    navText: ['<', '>']
  };

  ngOnInit() {
    this.productService.getProductBestSellerByStore().subscribe(res => {
      if (res.code === 'OK') {
        this.listProduct = res.data;
      }
    });
  }
}
