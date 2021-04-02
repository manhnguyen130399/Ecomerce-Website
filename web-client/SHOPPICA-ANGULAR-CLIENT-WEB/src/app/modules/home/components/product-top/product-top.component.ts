import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from '@core/model/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-top',
  templateUrl: './product-top.component.html',
  styleUrls: ['./product-top.component.css']
})
export class ProductBestSellerComponent implements OnInit {
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

  customOptions: OwlOptions = {
    loop: false,
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

  constructor() { }

  ngOnInit(): void {
  }

}
