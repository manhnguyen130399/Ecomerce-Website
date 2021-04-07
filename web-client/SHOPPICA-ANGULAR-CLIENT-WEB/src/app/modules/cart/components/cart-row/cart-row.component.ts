import { CartItemOptions } from './../../../../shared/modules/cart-item/models/cart-item-options.model';
import { CartItem } from './../../../../core/model/cart-item';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-row',
  templateUrl: './cart-row.component.html',
  styleUrls: ['./cart-row.component.css']
})
export class CartRowComponent implements OnInit {

  item = {
    id: 1,
    productName: "T-shirt product",
    price: 99,
    image: '/assets/images/products/product-2.jpg',
    quantity: 12,
  }

  cartItemOptions: CartItemOptions = {
    showActions: true,
    showSize: true,
    showColor: true,
    size: 'large'
  }
  constructor() { }

  ngOnInit(): void {
  }

}
