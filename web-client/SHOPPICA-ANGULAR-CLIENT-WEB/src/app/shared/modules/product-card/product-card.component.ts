import { ShareService } from './../../../core/services/share/share.service';
import { Color } from '@core/model/color/color';
import { ProductDetail } from '@core/model/product/product-detail';
import { Size } from '@core/model/size/size';
import { Product } from '@core/model/product/product';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { getListColor, getListSize } from '@core/model/product/product-helper';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  listColor: Color[] = [];
  listSize: Size[] = [];
  sizeSelected: Size;
  colorSelected: Color;
  image: string;
  sizes: string = "";
  constructor(private readonly shareService: ShareService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.product !== undefined) {
      this.listSize = getListSize(changes.product.currentValue.productDetails);
      this.listColor = getListColor(changes.product.currentValue.productDetails);
      this.colorSelected = this.listColor[0];
      this.image = changes.product.currentValue.productImages[0].image;
      this.sizes = this.listSize.map(x => x.sizeName).join(", ");
    }
  }

  openQuickView(product: Product) {
    this.shareService.openQuickViewEvent(product);
  }

  openQuickShop(product: Product) {
    this.shareService.openQuickShopEvent(product);
  }
}
