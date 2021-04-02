import { HttpClient } from '@angular/common/http';
import { Product } from '@core/model/product';
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

  @ViewChild('productTrending', { static: false }) private productTrending: NzCarouselComponent;

  listProduct: Product[] = [
    {
      id: 1,
      productName: "Cream women pants",
      price: 35,
      image: "/assets/images/products/product-4.jpg",
      sizes: ["S", "M"],
      colors: ["Reb", "Green"]
    }
  ]

  constructor() { }

  ngOnInit() {

  }

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
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
