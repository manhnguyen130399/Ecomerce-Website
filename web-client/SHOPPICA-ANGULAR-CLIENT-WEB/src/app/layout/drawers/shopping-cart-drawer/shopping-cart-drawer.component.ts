import { Router } from '@angular/router';
import { CartRequest } from './../../../core/model/cart/cart-request';
import { CartService } from './../../../core/services/cart/cart.service';
import { Cart } from './../../../core/model/cart/cart';
import { ShareService } from './../../../core/services/share/share.service';
import { CartItemOptions } from '@shared/modules/cart-item/models/cart-item-options.model';
import { CartItem } from '@core/model/cart/cart-item';
import { AuthService } from '@core/services/auth/auth.service';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shopping-cart-drawer',
  templateUrl: './shopping-cart-drawer.component.html',
  styleUrls: ['./shopping-cart-drawer.component.css']
})
export class ShoppingCartDrawerComponent implements OnInit {
  cart: Cart;
  isVisible: boolean;
  isLoading = false;

  cartItemOptions: CartItemOptions = {
    showActions: true,
    showBorder: true,
    showInput: true,
    showPrice: true,
    size: 'large',
    shortDetail: true
  }

  constructor(
    private readonly authService: AuthService,
    private readonly shareService: ShareService,
    private readonly cartService: CartService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.shareService.addToCartSuccessEmitted$.subscribe((cart) => {
      if (cart) {
        this.cart = cart;
      }

    })

    this.shareService.openCartDrawerEmitted$.subscribe((data) => {
      this.isVisible = true;
    })

    if (this.authService.isAuthenticated) {
      this.cartService.getCartById().subscribe((res) => {
        if (res.isSuccessed) {
          this.cart = res.data;
          this.shareService.addToCartSuccessEvent(res.data);
          this.shareService.changeNumCartItemEvent(res.data.cartItems.length);
        }
      })
    }
  }

  closeMenu(): void {
    this.isVisible = false;
  }

  deleteItem(cartDeleted: CartRequest) {
    this.cart.total -= cartDeleted.quantity * cartDeleted.price;
    this.cart.cartItems = this.cart.cartItems.filter(c => c.productDetailId != cartDeleted.productDetailId);
    this.shareService.changeNumCartItemEvent(this.cart.cartItems.length);
  }

  loadingEvent(isLoad: boolean) {
    this.isLoading = isLoad;
  }

  changeQuantity(priceChange: number) {
    this.cart.total -= priceChange;
  }

  viewCart() {
    this.isVisible = false;
    this.router.navigate(['/cart']);
  }

  viewCheckout() {
    this.isVisible = false;
    this.router.navigate(['/checkout/information']);
  }

}
