import { OrderDetailResponse } from './order-detail-response';
import { Address } from '../address/address';
export interface OrderResponse {
  id: number;
  customerName: string;
  address: Address;
  email: string;
  phone: string;
  state: string;
  created_at: Date;
  total: number;
  discount: number;
  shippingCost: number;
  qrCode: string;
  orderDetails: OrderDetailResponse[];
}
