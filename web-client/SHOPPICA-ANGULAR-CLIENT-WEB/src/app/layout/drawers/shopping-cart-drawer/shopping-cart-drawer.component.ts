import { ModalService } from './../../../core/services/modal/modal.service';
import { LoaderService } from './../../../shared/modules/loader/loader.service';
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
  disableGotoCheckout = false;

  cartItemOptions: CartItemOptions = {
    showActions: true,
    showBorder: true,
    showInput: true,
    showPrice: true,
    size: 'large',
    shortDetail: true
  };

  constructor(
    private readonly authService: AuthService,
    private readonly shareService: ShareService,
    private readonly cartService: CartService,
    private readonly router: Router,
    private readonly loaderService: LoaderService,
    private readonly modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.shareService.cartEmitted$.subscribe((cart) => {
      this.cart = cart;
      this.disableGotoCheckout = this.cart.cartItems.filter(x => x.quantity <= x.available).length == 0
    });

    this.modalService.openCartDrawerEmitted$.subscribe(() => {
      this.isVisible = true;
      this.disableGotoCheckout = this.cart.cartItems.filter(x => x.quantity <= x.available).length == 0
    });

    this.modalService.closeCartDrawerEmitted$.subscribe(data => {
      this.isVisible = false;
    });

    if (this.authService.isAuthenticated()) {
      this.cartService.getCartById().subscribe((res) => {
        if (res.isSuccessed) {
          this.shareService.cartEmitEvent(res.data);
        }
      });
    }
  }

  closeMenu(): void {
    this.isVisible = false;
  }

  loadingEvent(isLoad: boolean) {
    isLoad
      ? this.loaderService.showLoader('shoppingCart')
      : this.loaderService.hideLoader('shoppingCart');
  }

  viewCart() {
    this.isVisible = false;
    this.router.navigate(['/cart']);
  }

  viewCheckout() {
    this.isVisible = false;
    this.router.navigate(['/checkout/information']);
  }

  returnToShop() {
    this.isVisible = false;
    this.router.navigate(['/product/collection/all']);
  }

}
