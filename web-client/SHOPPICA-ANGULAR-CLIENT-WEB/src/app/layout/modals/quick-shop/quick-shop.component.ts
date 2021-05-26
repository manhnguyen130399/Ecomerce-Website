import { NzMessageService } from 'ng-zorro-antd/message';
import { ModalService } from './../../../core/services/modal/modal.service';
import { AuthService } from './../../../core/services/auth/auth.service';
import { finalize } from 'rxjs/operators';
import { CartService } from './../../../core/services/cart/cart.service';
import { CartRequest } from '../../../core/model/cart/cart-request';
import { Router } from '@angular/router';
import { CartItemOptions } from '@shared/modules/cart-item/models/cart-item-options.model';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Color } from '@core/model/color/color';
import { Size } from '@core/model/size/size';
import { ProductDetail } from '@core/model/product/product-detail';
import { ShareService } from './../../../core/services/share/share.service';
import { Product } from '../../../core/model/product/product';
import { Component, OnInit } from '@angular/core';
import { getListColor, getListSize } from '@core/model/product/product-helper';
import { getAvailableQuantity, getInCartQuantity, getProductDetailId } from '@core/model/cart/cart-helper';
import { CartItemUpdate } from '@core/model/cart/cart-item-update';
import { Cart } from '@core/model/cart/cart';

@Component({
  selector: 'app-quick-shop',
  templateUrl: './quick-shop.component.html',
  styleUrls: ['./quick-shop.component.css']
})
export class QuickShopComponent implements OnInit {
  isVisible = false;
  product: Product;
  listSize: Size[] = [];
  listColor: Color[] = [];
  colorSelected: Color;
  sizeSelected: Size;
  cart: Cart;
  cartItem;
  quantity = 1;
  isAddingToCart = false;
  editMode: boolean;
  oldProductDetailId: number;
  cartItemOptions: CartItemOptions = {
    size: 'small'
  };

  constructor(
    private readonly shareService: ShareService,
    private readonly router: Router,
    private readonly cartService: CartService,
    private readonly authService: AuthService,
    private readonly modalService: ModalService,
    private readonly messageService: NzMessageService
  ) { }


  ngOnInit(): void {
    this.shareService.cartEmitted$.subscribe((cart) => {
      this.cart = cart;
    });

    this.addToCartMode();
    this.editCartMode();
    this.closeQuickShop();
  }

  closeQuickShop() {
    this.modalService.closeQuickShopEmitted$.subscribe(data => {
      this.isVisible = false;
    });
  }

  editCartMode() {
    this.shareService.editCartItemEmitted$.subscribe(oldCartItem => {
      this.quantity = oldCartItem.quantity;
      this.editMode = true;
      this.oldProductDetailId = oldCartItem.oldProductDetailId;
      const productDetailSelect = this.product.productDetails.filter(pd => pd.productDetailId == oldCartItem.oldProductDetailId);
      if (productDetailSelect.length > 0) {
        this.colorSelected = this.listColor.filter(x => x.id == productDetailSelect[0].colorId)[0];
        this.sizeSelected = this.listSize.filter(x => x.id == productDetailSelect[0].sizeId)[0];
      }
    });
  }

  addToCartMode() {
    this.modalService.openQuickShopEmitted$.subscribe((product) => {
      this.product = product;
      this.isVisible = true;
      this.listSize = getListSize(product.productDetails);
      this.listColor = getListColor(product.productDetails);
      this.colorSelected = this.listColor[0];
      this.sizeSelected = this.listSize[0];
      this.setCartItem(product);
      this.quantity = 1;
      this.editMode = false;
    });
  }

  setCartItem(product: Product) {
    this.cartItem = {
      productName: product.productName,
      image: product.productImages[0].image,
      productId: product.id
    };
  }

  handleCancel() {
    this.isVisible = false;
  }

  viewDetail(id: number) {
    this.isVisible = false;
    this.router.navigate(['/product/detail', id]);
  }

  saveChangeCart() {
    if (!this.authService.isAuthenticated()) {
      this.isVisible = false;
      this.modalService.openLoginDrawerEvent();
      return;
    }

    const productDetailId = getProductDetailId(this.product.productDetails, this.colorSelected.id, this.sizeSelected.id)
    const availableQuantity = getAvailableQuantity(this.product.productDetails, productDetailId);
    const inCartQuantity = getInCartQuantity(this.cart.cartItems, productDetailId);

    if (this.quantity + inCartQuantity > availableQuantity) {
      let errorStr = `${this.product.productName}(${this.colorSelected.colorName} - ${this.sizeSelected.sizeName}) only ${availableQuantity} product is available.`;
      errorStr += inCartQuantity > 0 ? `Your cart has ${inCartQuantity} product.` : "";
      this.messageService.error(errorStr)
      return;
    }

    this.editMode ? this.editCart(productDetailId) : this.addToCart(productDetailId);
  }

  addToCart(productDetailId: number) {
    const body: CartRequest = {
      productDetailId: productDetailId,
      quantity: this.quantity,
      price: this.product.price,
    };

    this.isAddingToCart = true;
    this.cartService.addToCart(body)
      .pipe(
        finalize(() => this.isAddingToCart = false)
      )
      .subscribe((res) => {
        if (res.isSuccessed) {
          this.isVisible = false;
          this.shareService.cartEmitEvent(res.data);
          this.modalService.openCartDrawerEvent();
        }
      });
  }

  editCart(productDetailId: number) {
    const body: CartItemUpdate = {
      oldProductDetailId: this.oldProductDetailId,
      quantity: this.quantity,
      price: this.product.price,
      newProductDetailId: productDetailId
    };

    this.isAddingToCart = true;
    this.cartService.updateCart(body)
      .pipe(
        finalize(() => this.isAddingToCart = false)
      )
      .subscribe((res) => {
        if (res.isSuccessed) {
          this.isVisible = false;
          this.shareService.cartEmitEvent(res.data);
        }
      });
  }

}
