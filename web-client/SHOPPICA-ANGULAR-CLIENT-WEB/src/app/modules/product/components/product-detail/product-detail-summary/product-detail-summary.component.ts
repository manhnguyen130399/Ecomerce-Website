import { Product } from '@core/model/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail-summary',
  templateUrl: './product-detail-summary.component.html',
  styleUrls: ['./product-detail-summary.component.css']
})
export class ProductDetailSummaryComponent implements OnInit {

  constructor() { }

  date = new Date();
  ngOnInit(): void {
  }

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
  cartItem = {
    id: 1,
    productName: "Cream women pants",
    price: 35,
    image: "/assets/images/products/product-4.jpg",
    quantity: 1
  }
}
