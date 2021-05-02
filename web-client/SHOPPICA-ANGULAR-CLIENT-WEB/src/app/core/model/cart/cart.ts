import { CartItem } from '@core/model/cart/cart-item';
import { CartGroup } from './cart-group';
export interface Cart {
  id: number;
  total: number;
  cartItems?: CartItem[];
}
