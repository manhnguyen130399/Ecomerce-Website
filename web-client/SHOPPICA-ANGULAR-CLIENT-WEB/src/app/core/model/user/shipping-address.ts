import { Address } from '../address/address';

export interface ShippingAddress {
  customerName: string;
  address: Address;
  phone: string;
  email: string;
}
