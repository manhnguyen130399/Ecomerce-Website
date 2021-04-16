import { CartItem } from '@core/model/cart-item';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItem: CartItem = {
    id: 1,
    productName: "Ribbed Stripe Top",
    price: 15,
    quantity: 4,
    image: "/assets/images/products/product-1.jpg"
  }

  listCartItem: CartItem[] = [
    this.cartItem,
    this.cartItem,
    this.cartItem,
    this.cartItem,
    this.cartItem,
    this.cartItem,
    this.cartItem
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
