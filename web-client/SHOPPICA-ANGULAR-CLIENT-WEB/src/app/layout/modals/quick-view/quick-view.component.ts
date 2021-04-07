import { OwlOptions } from 'ngx-owl-carousel-o';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { Product } from './../../../core/model/product';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.css']
})
export class QuickViewComponent implements OnInit {
  @ViewChild('productImages', { static: false }) private productImages: NzCarouselComponent;
  isVisible = false;
  constructor() { }
  product: Product = {
    id: 1,
    productName: "Cream women pants",
    price: 35,
    description: "Go sporty this summer with this vintage navy and white striped v-neck t-shirt from the Nike. Perfect for pairing with denim and white kicks for a stylish sporty vibe.",
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
        colorName: "YELLOW",
        colorCode: "#e1eb78"
      }
    ],
    isNew: true,
    discount: 20
  };

  listProductImage = [
    "/assets/images/products/product-5.jpg",
    "/assets/images/products/product-6.jpg",
  ]

  cartItem = {
    id: 1,
    productName: "Cream women pants",
    price: 35,
    image: "/assets/images/products/product-4.jpg",
    quantity: 1
  }


  handleCancel(): void {
    this.isVisible = false;
  }

  customOptions: OwlOptions = {
    loop: false,
    autoplay: true,
    dots: false,

    responsive: {
      400: {
        items: 1
      }
    },
    nav: true,
    navText: ['<', '>']
  }
  ngOnInit(): void {
  }

  prev() {
    this.productImages.pre();
  }

  next() {
    this.productImages.next();
  }

}
