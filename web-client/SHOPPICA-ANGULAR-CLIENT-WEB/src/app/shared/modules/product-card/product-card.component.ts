import { Color } from './../../../core/model/color';
import { Product } from '@core/model/product';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  sizes: string = "";
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.product !== undefined) {
      this.sizes = changes.product.currentValue.sizes.map(x => x.sizeName).join(", ");
    }
  }


}
