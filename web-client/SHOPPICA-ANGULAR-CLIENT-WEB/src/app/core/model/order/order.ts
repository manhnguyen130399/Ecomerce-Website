import { OrderGroup } from './order-group';
import { Address } from '../address/address';
export interface Order {
  customerName: string;
  address: Address;
  email: string;
  phone: string;
  paymentMethod: string;
  transactionId: string;
  OrderOneStores: OrderGroup[];
}
