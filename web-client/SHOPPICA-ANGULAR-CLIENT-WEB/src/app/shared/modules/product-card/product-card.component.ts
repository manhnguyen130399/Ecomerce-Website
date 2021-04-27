import { Color } from '@core/model/color/color';
import { ProductDetail } from '@core/model/product/product-detail';
import { Size } from '@core/model/size/size';
import { Product } from '@core/model/product/product';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  listColor: Color[] = [];
  listSize: Size[] = [];
  image: string;
  sizes: string = "";
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.product !== undefined) {
      this.listSize = this.getListSize(changes.product.currentValue.productDetails);
      this.listColor = this.getListColor(changes.product.currentValue.productDetails);
      this.image = changes.product.currentValue.productImages[0].image;
      this.sizes = this.listSize.map(x => x.sizeName).join(", ");
    }
  }


  getListSize(productDetails: ProductDetail[]) {
    let distinctSizes = new Set<string>();
    productDetails.forEach(element => {
      const size: Size = {
        id: element.sizeId,
        sizeName: element.size,
      }
      distinctSizes.add(JSON.stringify(size));
    });

    return [...distinctSizes].map(x => JSON.parse(x));
  }

  getListColor(productDetails: ProductDetail[]) {
    let distinctColors = new Set<string>();
    productDetails.forEach(element => {
      const color: Color = {
        id: element.colorId,
        colorName: element.color,
        colorCode: element.colorHex
      }
      distinctColors.add(JSON.stringify(color));
    });

    return [...distinctColors].map(x => JSON.parse(x));
  }
}
