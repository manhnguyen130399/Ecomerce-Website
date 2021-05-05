import { ProductDetail } from '@core/model/product/product-detail';
export function getProductDetailId(productDetails: ProductDetail[], colorId: number, sizeId: number): number {
  const productDetail = productDetails.filter(
    x => x.colorId === colorId && x.sizeId === sizeId
  );

  return productDetail.length > 0 ? productDetail[0].productDetailId : null;
}
