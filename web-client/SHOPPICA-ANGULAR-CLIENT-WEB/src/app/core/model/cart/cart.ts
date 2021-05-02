import { CartItem } from '@core/model/cart/cart-item';
export class Cart {
  id: number;
  total: number;
  cartItems: CartItem[];

  constructor() {
    this.id = -1;
    this.total = 0;
    this.cartItems = [];
  }
}
