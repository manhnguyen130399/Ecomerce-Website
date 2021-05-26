export interface CartItem {
  id?: number;
  productName: string;
  price: number;
  quantity?: number;
  available?: number;
  image: string;
  productDetailId?: number;
  productId?: number;
  colorName?: string;
  sizeName?: string;
  storeId?: number;
}
