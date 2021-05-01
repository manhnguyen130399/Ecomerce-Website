import { finalize } from 'rxjs/operators';
import { CartService } from './../../../../core/services/cart/cart.service';
import { ShareService } from './../../../../core/services/share/share.service';
import { AuthService } from '@core/services/auth/auth.service';
import { Cart } from '../../../../core/model/cart/cart';
import { Product } from '@core/model/product/product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit } from '@angular/core';
import { CartRequest } from '@core/model/cart/cart-request';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart;
  isLoading = false;
  initialLoading = false;
  listProduct: Product[] = [

  ]
  customOptions: OwlOptions = {
    loop: false,
    autoplay: true,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      400: {
        items: 2
      },
      600: {
        items: 3
      },
      768: {
        items: 4
      }
    },
    nav: true,
    navText: ['<', '>']
  }
  constructor(
    private readonly authService: AuthService,
    private readonly shareService: ShareService,
    private readonly cartService: CartService
  ) { }

  ngOnInit(): void {
    this.initialLoading = true;
    this.shareService.addToCartSuccessEmitted$.subscribe((cart) => {
      if (cart !== null) {
        this.cart = cart;
        this.initialLoading = false;
      }
    })
  }

  loadingEvent(isLoad: boolean) {
    this.isLoading = isLoad;
  }

  deleteItem(cartDeleted: CartRequest) {
    this.cart.total -= cartDeleted.quantity * cartDeleted.price;
    this.cart.cartItems = this.cart.cartItems.filter(c => c.productDetailId != cartDeleted.productDetailId);
    this.shareService.changeNumCartItemEvent(this.cart.cartItems.length);
  }

  changeQuantity(priceChange: number) {
    this.cart.total -= priceChange;
  }
}
