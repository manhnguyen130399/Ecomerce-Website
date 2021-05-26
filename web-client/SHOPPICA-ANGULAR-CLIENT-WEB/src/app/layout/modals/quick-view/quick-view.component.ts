import { NzMessageService } from 'ng-zorro-antd/message';
import { ModalService } from './../../../core/services/modal/modal.service';
import { AuthService } from './../../../core/services/auth/auth.service';
import { ProductService } from './../../../core/services/product/product.service';
import { CartService } from './../../../core/services/cart/cart.service';
import { CartRequest } from '../../../core/model/cart/cart-request';
import { Router } from '@angular/router';
import { Color } from '@core/model/color/color';
import { Size } from '@core/model/size/size';
import { ShareService } from './../../../core/services/share/share.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { Product } from '../../../core/model/product/product';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductImage } from '@core/model/product/product-image';
import { getListColor, getListSize } from '@core/model/product/product-helper';
import { getAvailableQuantity, getInCartQuantity, getProductDetailId } from '@core/model/cart/cart-helper';
import { finalize } from 'rxjs/operators';
import { Cart } from '@core/model/cart/cart';

@Component({
  selector: 'app-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.css']
})
export class QuickViewComponent implements OnInit {
  @ViewChild('productImages', { static: false }) private productImages: NzCarouselComponent;
  isVisible = false;
  listProductImage: string[] = [];
  listSize: Size[] = [];
  listColor: Color[] = [];
  colorSelected: Color;
  sizeSelected: Size;
  product: Product;
  cart: Cart;
  isAddingToCart = false;
  isChangeWishList = false;
  inWishList = false;
  listWishIds: number[] = [];
  quantity = 1;
  customOptions: OwlOptions = {
    loop: false,
    autoplay: true,
    dots: false,

    responsive: {
      400: {
        items: 1
      }
    },
    nav: true,
    navText: ['<', '>']
  };

  constructor(
    private readonly shareService: ShareService,
    private readonly router: Router,
    private readonly cartService: CartService,
    private readonly productService: ProductService,
    private readonly authService: AuthService,
    private readonly modalService: ModalService,
    private readonly messageService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.shareService.cartEmitted$.subscribe((cart) => {
      this.cart = cart;
    });

    this.modalService.openQuickViewEmitted$.subscribe((product) => {
      this.product = product;
      this.isVisible = true;
      this.listSize = getListSize(product.productDetails);
      this.listColor = getListColor(product.productDetails);
      this.colorSelected = this.listColor[0];
      this.sizeSelected = this.listSize[0];
      this.setImages(product.productImages);
    });
    this.shareService.wishlistEmitted$.subscribe(listIds => {
      this.listWishIds = listIds;
      if (listIds.indexOf(this.product?.id) !== -1) {
        this.inWishList = true;
      }
      else {
        this.inWishList = false;
      }
    });
  }

  addToWishList(productId: number) {
    if (!this.authService.isAuthenticated()) {
      this.isVisible = false;
      this.modalService.openLoginDrawerEvent();
      return;
    }

    if (this.inWishList) {
      this.router.navigate(['/product/wishlist']);
      return;
    }
    this.isChangeWishList = true;
    this.productService.addToWishList(productId)
      .pipe(
        finalize(() => this.isChangeWishList = false)
      ).subscribe(res => {
        if (res.code == 'OK') {
          this.listWishIds.push(productId);
          this.shareService.wishListEmitEvent(this.listWishIds);
        }
      });
  }

  setImages(productImage: ProductImage[]) {
    this.listProductImage = productImage.map(x => x.image);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  prev() {
    this.productImages.pre();
  }

  next() {
    this.productImages.next();
  }

  viewDetail(id: number) {
    this.isVisible = false;
    this.router.navigate(['/product/detail', id]);
  }

  colorSelectEvent(color: Color) {
    this.colorSelected = color;
  }

  sizeSelectEvent(size: Size) {
    this.sizeSelected = size;
  }

  addToCart() {
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


}
