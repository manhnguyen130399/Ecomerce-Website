import { CartItem } from './cart-item';
export interface CartGroup {
  storeId: number;
  storeName: string;
  storeWebsite: string;
  cartItems: CartItem[];
}
