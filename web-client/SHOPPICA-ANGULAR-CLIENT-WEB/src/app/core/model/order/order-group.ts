import { OrderDetail } from './order-details';

export interface OrderGroup {
  notes: string;
  orderDetails: OrderDetail[];
  total: number;
  storeId: number;
  discount?: number;
  promotionId?: number;
  shippingCost: number;
}
