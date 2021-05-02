import { ShippingAddress } from './../../model/user/shipping-address';
import { Customer } from '@core/model/user/customer';
import { CartItem } from './../../model/cart/cart-item';
import { OldCartItem } from './../../model/cart/old-cart-item';
import { Cart } from './../../model/cart/cart';
import { Product } from '@core/model/product/product';
import { Injectable } from '@angular/core';
import { Store } from '@core/model/store/store';
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
  private customerInfo = new BehaviorSubject<Customer>(null);
  private shippingAddress = new BehaviorSubject<ShippingAddress>(null);

  loginSuccessEmitted$ = this.loginSuccess.asObservable();
  openQuickViewEmitted$ = this.openQuickView.asObservable();
  openQuickShopEmitted$ = this.openQuickShop.asObservable();
  addToCartSuccessEmitted$ = this.addToCartSuccess.asObservable();
  openCartDrawerEmitted$ = this.openCartDrawer.asObservable();
  editCartItemEmitted$ = this.editCartItem.asObservable();
  changeNumCartItemEmitted$ = this.changeNumCartItem.asObservable();
  customerInfoEmitted$ = this.customerInfo.asObservable();
  shippingAddressEmitted$ = this.shippingAddress.asObservable();

  private storeId = new BehaviorSubject<number>(null);

  loadStoreInfoSEmitted$ = this.storeId.asObservable()

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

  customerInfoChangeEvent(customer: Customer) {
    this.customerInfo.next(customer);
  }

  shippingAddressChangeEvent(address: ShippingAddress) {
    this.shippingAddress.next(address);
  }

  storeInfoSuccessEvent(id: number) {
    this.storeId.next(id)
  }

  constructor() { }
}
