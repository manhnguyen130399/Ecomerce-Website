import { Address } from '@core/model/address/address';
import { Promotion } from '../promotion/promotion';

export interface Store {
  id: number;
  storeName: string;
  address: Address;
  owner: string;
  openTime: string;
  closeTime: string;
  website: string;
  logo: string;
  createdAt: Date;
  totalProduct: number;
  promotions: Promotion[];
}
