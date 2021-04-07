import { Color } from './color';
import { Size } from './size';
export interface Product {
  id: number;
  productName: string;
  image: string;
  price: number;
  isNew: boolean;
  discount: number;
  description?: string;
  sizes: Size[];
  colors: Color[];
}
