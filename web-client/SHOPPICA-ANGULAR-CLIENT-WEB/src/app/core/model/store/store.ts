import { Address } from '@core/model/address/address';
export interface Store {
  id: number;
  storeName: string;
  address: Address;
  owner: string;
  openTime: string;
  closeTime: string;
  website: string;
  logo: string;
}
