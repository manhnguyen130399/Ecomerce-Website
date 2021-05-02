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
  product = {
    id: 1,
    productName: "Cream women pants",
    price: 35,
    image: "/assets/images/products/product-4.jpg",
    sizes: [
      {
        id: 1,
        sizeName: "M"
      },
      {
        id: 2,
        sizeName: "L"
      },
      {
        id: 3,
        sizeName: "XL"
      }
    ],
    colors: [
      {
        id: 1,
        colorName: "Red",
        colorCode: "#ff0000",
      },
      {
        id: 2,
        colorName: "Gray",
        colorCode: "#ccc"
      },
      {
        id: 3,
        colorName: "yellow",
        colorCode: "#e1eb78"
      }
    ],
    comments: [],
    isNew: true,
    discount: 20
  };
  listProduct: Product[] = [
    this.product,
    this.product,
    this.product,
    this.product,
    this.product,
    this.product,
  ]

  constructor() { }

  ngOnInit() {

  }

  customOptions: OwlOptions = {
    loop: true,
    autoplay: false,
    dots: false,
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
  }
}
