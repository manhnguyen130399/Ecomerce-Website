import { Time } from '@angular/common';
import { Address } from './address';
export interface Store {
  storeName: string;
  address: string;
  owner: string;
  openTime: string;
  closeTime: string;
  website: string;
  logo: string;
}
