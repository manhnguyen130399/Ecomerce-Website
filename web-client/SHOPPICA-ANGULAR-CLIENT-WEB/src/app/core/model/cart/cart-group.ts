import { CartItem } from './cart-item';
export interface CartGroup {
  storeId: number;
  cartItems: CartItem[];
}
