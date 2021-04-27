import { StepsService } from './../../services/steps.service';
import { Cart } from '../../../../core/model/cart/cart';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
  constructor(private readonly stepService: StepsService) { }

  ngOnInit(): void {
    this.stepService.changeStep(3);
  }

  cart: Cart =
    {
      id: 1,
      total: 230,
      cartGroups: [
        {
          storeId: 1,
          storeName: "Minh Nhật Style",
          storeWebsite: "",
          cartItems: [
            {
              id: 1,
              productName: "T-shirt product",
              price: 99,
              image: '/assets/images/products/product-2.jpg',
              quantity: 12,
            },
            {
              id: 3,
              productName: "Mercury Tee",
              price: 12,
              image: '/assets/images/products/product-4.jpg',
              quantity: 12,
            }
          ]
        },
        {
          storeId: 2,
          storeName: "ChildoShop",
          storeWebsite: "",
          cartItems: [
            {
              id: 1,
              productName: "Cream Women Pants",
              price: 25,
              image: '/assets/images/products/product-3.jpg',
              quantity: 2,
            }
          ]
        }
      ]
    }
}
