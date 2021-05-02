import { ProductImage } from './product-image';
import { ProductDetail } from './product-detail';
import { Color } from '../color/color';
import { Size } from '../size/size';
import { Comment } from '../comment/comment';
export interface Product {
  id: number;
  productName: string;
  image: string;
  price: number;
  isNew?: boolean;
  discount?: number;
  description?: string;
  inWishList?: boolean;
  productDetails?: ProductDetail[];
  productImages?: ProductImage[];
  sizes: Size[];
  colors: Color[];
  comments: Comment[];
}
