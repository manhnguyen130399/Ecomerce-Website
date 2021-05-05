import { ShippingAddress } from './../../model/user/shipping-address';
import { Customer } from '@core/model/user/customer';
import { OldCartItem } from './../../model/cart/old-cart-item';
import { Cart } from './../../model/cart/cart';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  private loginSuccess = new BehaviorSubject<boolean>(false);
  private gotoCartPage = new Subject<boolean>();

  private cart = new BehaviorSubject<Cart>(new Cart());
  private wishlist = new BehaviorSubject<number[]>([]);
  private editCartItem = new Subject<OldCartItem>();
  private changeNumCartItem = new Subject<number>();
  private customerInfo = new BehaviorSubject<Customer>(null);
  private shippingAddress = new BehaviorSubject<ShippingAddress>(null);
  private storeId = new BehaviorSubject<number>(null);

  loginSuccessEmitted$ = this.loginSuccess.asObservable();
  gotoCartPageEmitted$ = this.gotoCartPage.asObservable();


  cartEmitted$ = this.cart.asObservable();
  wishlistEmitted$ = this.wishlist.asObservable();
  editCartItemEmitted$ = this.editCartItem.asObservable();
  changeNumCartItemEmitted$ = this.changeNumCartItem.asObservable();
  customerInfoEmitted$ = this.customerInfo.asObservable();
  shippingAddressEmitted$ = this.shippingAddress.asObservable();
  loadStoreInfoSEmitted$ = this.storeId.asObservable();

  loginSuccessEvent() {
    this.loginSuccess.next(true);
  }

  changeGotoCartPage(isGotoPage: boolean) {
    this.gotoCartPage.next(isGotoPage);
  }

  cartEmitEvent(cart: Cart) {
    this.cart.next(cart);
    this.changeNumCartItem.next(cart.cartItems.length);
  }

  wishListEmitEvent(productIds: number[]) {
    this.wishlist.next(productIds);
  }

  editCartItemEvent(cartItem: OldCartItem) {
    this.editCartItem.next(cartItem);
  }

  changeNumCartItemEvent(num: number) {
    this.changeNumCartItem.next(num);
  }

  customerInfoChangeEvent(customer: Customer) {
    this.customerInfo.next(customer);
  }

  shippingAddressChangeEvent(address: ShippingAddress) {
    this.shippingAddress.next(address);
  }

  storeInfoSuccessEvent(id: number) {
    this.storeId.next(id);
  }

  constructor() { }
}
