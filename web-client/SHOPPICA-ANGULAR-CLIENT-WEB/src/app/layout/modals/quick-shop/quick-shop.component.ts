import { Product } from '../../../core/model/product/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quick-shop',
  templateUrl: './quick-shop.component.html',
  styleUrls: ['./quick-shop.component.css']
})
export class QuickShopComponent implements OnInit {
  isVisible = false;
  constructor() { }
  product: Product = {
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
  ngOnInit(): void {
  }

  handleCancel() {
    this.isVisible = false;
  }

}
