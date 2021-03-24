import { Address } from './../../profile/model/address';
import { OrderDetail } from './order-detail';
export interface Order {
  id: number;
  customerName: string;
  address: Address;
  email: string;
  phone: string;
  state: string;
  qrCode: string;
  notes: string;
  total: string;
  discount: number;
  shippingCost: number;
  created_at: Date;
  orderDetails: OrderDetail[];
}
