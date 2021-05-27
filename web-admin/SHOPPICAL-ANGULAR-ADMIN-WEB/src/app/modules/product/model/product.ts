import { ProductImage } from './product-image';
import { ProductDetail } from './product-detail';
export interface Product {
  id: number;
  productName: string;
  price: number;
  categoryId: number;
  categoryName: string;
  brandId: number;
  brandName: string;
  description: string;
  productDetails: ProductDetail[];
  productImages: ProductImage[];
  images: string[]
}
