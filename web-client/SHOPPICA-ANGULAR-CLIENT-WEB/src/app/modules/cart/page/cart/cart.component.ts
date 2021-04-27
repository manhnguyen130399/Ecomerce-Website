import { Cart } from '../../../../core/model/cart/cart';
import { Product } from '@core/model/product/product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
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
    isNew: true,
    discount: 20
  };
  listProduct: Product[] = [
    this.product,
    this.product,
    this.product,
    this.product,
  ]

  item = {
    id: 1,
    productName: "T-shirt product",
    price: 99,
    image: '/assets/images/products/product-2.jpg',
    quantity: 12,
  };

  listCartItem = [
    this.item,
    this.item,
    this.item,
    this.item,
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
