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
import { getProductDetailId } from '@core/model/cart/cart-helper';
import { CartItemUpdate } from '@core/model/cart/cart-item-update';

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
  cartItem;
  quantity: number = 1;
  isAddingToCart = false;
  editMode: boolean;
  oldProductDetailId: number;
  cartItemOptions: CartItemOptions = {
    size: "small"
  }

  constructor(
    private readonly shareService: ShareService,
    private readonly router: Router,
    private readonly cartService: CartService
  ) { }


  ngOnInit(): void {
    this.addToCartMode();
    this.editCartMode();
  }

  editCartMode() {
    this.shareService.editCartItemEmitted$.subscribe(oldCartItem => {
      this.quantity = oldCartItem.quantity;
      this.editMode = true;
      this.oldProductDetailId = oldCartItem.oldProductDetailId;
      let productDetailSelect = this.product.productDetails.filter(pd => pd.productDetailId == oldCartItem.oldProductDetailId);
      if (productDetailSelect.length > 0) {
        this.colorSelected = this.listColor.filter(x => x.id == productDetailSelect[0].colorId)[0];
        this.sizeSelected = this.listSize.filter(x => x.id == productDetailSelect[0].sizeId)[0];
      }
    })
  }

  addToCartMode() {
    this.shareService.openQuickShopEmitted$.subscribe((product) => {
      this.product = product;
      this.isVisible = true;
      this.listSize = getListSize(product.productDetails);
      this.listColor = getListColor(product.productDetails);
      this.colorSelected = this.listColor[0];
      this.sizeSelected = this.listSize[0];
      this.setCartItem(product);
      this.quantity = 1;
      this.editMode = false;
    })
  }


  setCartItem(product: Product) {
    this.cartItem = {
      productName: product.productName,
      image: product.productImages[0].image
    }
  }

  handleCancel() {
    this.isVisible = false;
  }

  viewDetail(id: number) {
    this.isVisible = false;
    this.router.navigate(['/product/detail', id]);
  }

  saveChangeCart() {
    this.editMode ? this.editCart() : this.addToCart();
  }

  addToCart() {
    const body: CartRequest = {
      productDetailId: getProductDetailId(this.product.productDetails, this.colorSelected.id, this.sizeSelected.id),
      quantity: this.quantity,
      price: this.product.price,
    }
    this.isAddingToCart = true;
    this.cartService.addToCart(body)
      .pipe(
        finalize(() => this.isAddingToCart = false)
      )
      .subscribe((res) => {
        if (res.isSuccessed) {
          this.isVisible = false;
          this.shareService.addToCartSuccessEvent(res.data);
          this.shareService.openCartDrawerEvent();
          this.shareService.changeNumCartItemEvent(res.data.cartItems.length);
        }
      })
  }

  editCart() {
    const body: CartItemUpdate = {
      oldProductDetailId: this.oldProductDetailId,
      quantity: this.quantity,
      price: this.product.price,
      newProductDetailId: getProductDetailId(this.product.productDetails, this.colorSelected.id, this.sizeSelected.id)
    }

    this.isAddingToCart = true;
    this.cartService.updateCart(body)
      .pipe(
        finalize(() => this.isAddingToCart = false)
      )
      .subscribe((res) => {
        if (res.isSuccessed) {
          this.isVisible = false;
          this.shareService.addToCartSuccessEvent(res.data);
        }
      })
  }

}
