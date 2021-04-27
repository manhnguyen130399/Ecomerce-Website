import { Promotion } from "./promotion";

export interface Store {
  id: number;
  storeName: string;
  owner: string;
  logo: string;
  address: string;
  promotions: Promotion[];
  createdAt: Date;
  totalProduct: number;
}
