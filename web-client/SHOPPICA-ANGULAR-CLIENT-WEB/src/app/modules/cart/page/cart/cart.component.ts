import { LoaderService } from './../../../../shared/modules/loader/loader.service';
import { finalize, delay } from 'rxjs/operators';
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
  initialLoading = true;
  listProduct: Product[] = [

  ];
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
  };
  constructor(
    private readonly shareService: ShareService,
    private readonly loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.loaderService.showLoader('cart-page');
    this.shareService.cartEmitted$.subscribe((cart) => {
      if (cart.id !== -1) {
        this.cart = cart;
        this.loaderService.hideLoader('cart-page');
        this.initialLoading = false;
      }

    });
  }

  loadingEvent(isLoad: boolean) {
    isLoad
      ? this.loaderService.showLoader('cart-item')
      : this.loaderService.hideLoader('cart-item');
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
