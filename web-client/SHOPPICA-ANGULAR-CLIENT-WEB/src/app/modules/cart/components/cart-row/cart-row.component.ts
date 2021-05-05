import { CartService } from './../../../../core/services/cart/cart.service';
import { CartItemOptions } from '@shared/modules/cart-item/models/cart-item-options.model';
import { CartItem } from '@core/model/cart/cart-item';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartRequest } from '@core/model/cart/cart-request';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-cart-row',
  templateUrl: './cart-row.component.html',
  styleUrls: ['./cart-row.component.css']
})
export class CartRowComponent implements OnInit {

  @Input() item: CartItem;
  @Input() mode: string;
  @Output() isLoading = new EventEmitter<boolean>();
  @Output() deleteItemEvent = new EventEmitter<CartRequest>();
  @Output() changeQuantityEvent = new EventEmitter<number>();
  cartItemOptions: CartItemOptions = {
    showActions: false,
    showSize: true,
    showColor: true,
  };

  constructor(private readonly cartService: CartService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes): void {
    if (changes.mode !== undefined && changes.mode.currentValue === 'cart') {
      this.cartItemOptions.showActions = true;
      this.cartItemOptions.size = 'large';
    }
  }

  loadingEvent(isLoad: boolean) {
    this.isLoading.emit(isLoad);
  }

  deleteItem(cartDeleted: CartRequest) {
    this.deleteItemEvent.emit(cartDeleted);
  }

  changeQuantity(quantity: number) {
    const request: CartRequest = {
      productDetailId: this.item.productDetailId,
      price: this.item.price,
      quantity
    };
    this.isLoading.emit(true);
    this.cartService.changeQuantity(request)
      .pipe(
        finalize(() => this.isLoading.emit(false))
      )
      .subscribe(res => {
        if (res.isSuccessed) {
          this.changeQuantityEvent.emit((this.item.quantity - quantity) * this.item.price);
          this.item.quantity = quantity;
        }
      });
  }
}
