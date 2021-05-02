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
  private gotoCartPage = new Subject<boolean>();

  private openQuickView = new Subject<Product>();
  private closeQuickView = new Subject<boolean>();
  private openQuickShop = new Subject<Product>();
  private closeQuickShop = new Subject<boolean>();
  private openCartDrawer = new Subject<boolean>();
  private closeCartDrawer = new Subject<boolean>();

  private cart = new BehaviorSubject<Cart>(new Cart());
  private editCartItem = new Subject<OldCartItem>();
  private changeNumCartItem = new Subject<number>();
  private customerInfo = new BehaviorSubject<Customer>(null);
  private shippingAddress = new BehaviorSubject<ShippingAddress>(null);

  loginSuccessEmitted$ = this.loginSuccess.asObservable();
  gotoCartPageEmitted$ = this.gotoCartPage.asObservable();
  openQuickViewEmitted$ = this.openQuickView.asObservable();
  closeQuickViewEmitted$ = this.closeQuickView.asObservable();
  openQuickShopEmitted$ = this.openQuickShop.asObservable();
  closeQuickShopEmitted$ = this.closeQuickShop.asObservable();
  openCartDrawerEmitted$ = this.openCartDrawer.asObservable();
  closeCartDrawerEmitted$ = this.closeCartDrawer.asObservable();

  cartEmitted$ = this.cart.asObservable();
  editCartItemEmitted$ = this.editCartItem.asObservable();
  changeNumCartItemEmitted$ = this.changeNumCartItem.asObservable();
  customerInfoEmitted$ = this.customerInfo.asObservable();
  shippingAddressEmitted$ = this.shippingAddress.asObservable();

  private storeId = new BehaviorSubject<number>(null);

  loadStoreInfoSEmitted$ = this.storeId.asObservable()

  loginSuccessEvent() {
    this.loginSuccess.next(true);
  }

  changeGotoCartPage(isGotoPage: boolean) {
    this.gotoCartPage.next(isGotoPage);
  }

  openQuickViewEvent(product: Product) {
    this.openQuickView.next(product);
  }

  closeQuickViewEvent() {
    this.closeQuickView.next();
  }

  openQuickShopEvent(product: Product) {
    this.openQuickShop.next(product);
  }

  closeQuickShopEvent() {
    this.closeQuickShop.next();
  }

  openCartDrawerEvent() {
    this.openCartDrawer.next(true);
  }

  closeCartDrawerEvent() {
    this.closeCartDrawer.next();
  }

  cartEmitEvent(cart: Cart) {
    this.cart.next(cart);
    this.changeNumCartItem.next(cart.cartItems.length);
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
