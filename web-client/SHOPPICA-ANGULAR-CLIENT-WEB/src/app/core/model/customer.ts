import { Address } from './address';
export interface Customer {
  customerName: string;
  address: Address;
  phone: string;
  email: string;
  image: string;
  gender: number;
}
