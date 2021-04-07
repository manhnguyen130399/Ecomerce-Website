import { Product } from './../../../../core/model/product';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  @Input() productCol: number = 6;

  listProduct: Product[] = [
    {
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
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
