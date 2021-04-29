import { CartItem } from './../../model/cart/cart-item';
import { OldCartItem } from './../../model/cart/old-cart-item';
import { Cart } from './../../model/cart/cart';
import { Product } from '@core/model/product/product';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  private loginSuccess = new BehaviorSubject<boolean>(false);
  private openQuickView = new Subject<Product>();
  private openQuickShop = new Subject<Product>();
  private addToCartSuccess = new BehaviorSubject<Cart>(null);
  private openCartDrawer = new Subject<boolean>();
  private editCartItem = new Subject<OldCartItem>();
  private changeNumCartItem = new Subject<number>();

  loginSuccessEmitted$ = this.loginSuccess.asObservable();
  openQuickViewEmitted$ = this.openQuickView.asObservable();
  openQuickShopEmitted$ = this.openQuickShop.asObservable();
  addToCartSuccessEmitted$ = this.addToCartSuccess.asObservable();
  openCartDrawerEmitted$ = this.openCartDrawer.asObservable();
  editCartItemEmitted$ = this.editCartItem.asObservable();
  changeNumCartItemEmitted$ = this.changeNumCartItem.asObservable();

  constructor() { }

  loginSuccessEvent() {
    this.loginSuccess.next(true);
  }

  openQuickViewEvent(product: Product) {
    this.openQuickView.next(product);
  }

  openQuickShopEvent(product: Product) {
    this.openQuickShop.next(product);
  }

  addToCartSuccessEvent(cart: Cart) {
    this.addToCartSuccess.next(cart);
  }

  openCartDrawerEvent() {
    this.openCartDrawer.next(true);
  }

  editCartItemEvent(cartItem: OldCartItem) {
    this.editCartItem.next(cartItem);
  }

  changeNumCartItemEvent(num: number) {
    this.changeNumCartItem.next(num);
  }

}
