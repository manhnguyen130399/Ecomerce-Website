import { CartItemOptions } from './models/cart-item-options.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem } from '@core/model/cart-item';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() item: CartItem;
  @Input() cartItemOptions: CartItemOptions;
  @Output() deleteItemEvent = new EventEmitter<number>();
  @Output() editItemEvent = new EventEmitter<number>();
  constructor() { }
  ngOnInit(): void {

  }

  changeQuantity(quantity: number) {
    console.log(quantity)
    if (quantity < 0) {
      this.item.quantity = 0;
    }
  }

  deleteItem(productId: number) {
    this.deleteItemEvent.emit(productId);
  }

  editItem(productId: number) {
    this.editItemEvent.emit(productId);
  }
}
