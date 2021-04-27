import { CartGroup } from './cart-group';
export interface Cart {
  id: number;
  total: number;
  cartGroups: CartGroup[];
}
