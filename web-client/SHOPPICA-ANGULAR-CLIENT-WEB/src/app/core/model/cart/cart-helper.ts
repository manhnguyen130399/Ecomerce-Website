import { CartItem } from '@core/model/cart/cart-item';
import { ProductDetail } from '@core/model/product/product-detail';
export function getProductDetailId(productDetails: ProductDetail[], colorId: number, sizeId: number): number {
  const productDetail = productDetails.filter(
    x => x.colorId === colorId && x.sizeId === sizeId
  );

  return productDetail.length > 0 ? productDetail[0].productDetailId : null;
}

export function getAvailableQuantity(productDetails: ProductDetail[], productDetailId: number) {

  const productDetail = productDetails.filter(p => p.productDetailId === productDetailId);

  return productDetail.length > 0 ? productDetail[0].quantity : 0;
}

export function getInCartQuantity(cartItems: CartItem[], productDetailId: number) {

  const cartItem = cartItems.filter(c => c.productDetailId == productDetailId);

  return cartItem.length > 0 ? cartItem[0].quantity : 0;
}
