import { CartItemOptions } from '@shared/modules/cart-item/models/cart-item-options.model';
import { CartItem } from '@core/model/cart/cart-item';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cart-row',
  templateUrl: './cart-row.component.html',
  styleUrls: ['./cart-row.component.css']
})
export class CartRowComponent implements OnInit {

  @Input() item: CartItem;
  @Input() mode: string;

  cartItemOptions: CartItemOptions = {
    showActions: false,
    showSize: true,
    showColor: true,
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes): void {
    if (changes.mode !== undefined && changes.mode.currentValue === "cart") {
      this.cartItemOptions.showActions = true;
      this.cartItemOptions.size = "large";
    }
  }

}
