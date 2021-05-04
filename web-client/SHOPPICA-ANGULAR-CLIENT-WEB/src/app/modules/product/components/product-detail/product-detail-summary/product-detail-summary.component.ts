import { Router } from '@angular/router';
import { ProductService } from './../../../../../core/services/product/product.service';
import { ShareService } from './../../../../../core/services/share/share.service';
import { CartService } from './../../../../../core/services/cart/cart.service';
import { getProductDetailId } from '@core/model/cart/cart-helper';
import { CartRequest } from './../../../../../core/model/cart/cart-request';
import { environment } from '@env';
import { GhnService } from '@core/services/ghn/ghn.service';
import { Address } from '@core/model/address/address';
import { AuthService } from '@core/services/auth/auth.service';
import { StoreService } from '@core/services/store/store.service';
import { Size } from '@core/model/size/size';
import { Color } from '@core/model/color/color';
import { Product } from '@core/model/product/product';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Store } from '@core/model/store/store';
import { finalize } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { getListColor, getListSize } from '@core/model/product/product-helper';

@Component({
  selector: 'app-product-detail-summary',
  templateUrl: './product-detail-summary.component.html',
  styleUrls: ['./product-detail-summary.component.css']
})
export class ProductDetailSummaryComponent implements OnInit {

  @Input() product: Product;
  store: Store;
  userAddress: Address;
  storeAddress: Address;
  listColor: Color[] = [];
  listSize: Size[] = [];
  colorSelected: Color;
  sizeSelected: Size;
  listObservable: Observable<any>[] = [];
  date = new Date();
  shippingFee: number;
  quantity: number;
  isAddingToCart = false;
  isChangeWishList = false;
  inWishList = false;
  listWishIds: number[] = [];

  constructor(
    private readonly storeService: StoreService,
    private readonly ghnService: GhnService,
    private readonly authService: AuthService,
    private readonly cartService: CartService,
    private readonly shareService: ShareService,
    private readonly productService: ProductService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.shareService.wishlistEmitted$.subscribe(listIds => {
      this.listWishIds = listIds;
      if (listIds.indexOf(this.product?.id) !== -1) {
        this.inWishList = true;
      }
      else {
        this.inWishList = false;
      }
    })
  }

  addToWishList(productId: number) {
    if (this.inWishList) {
      this.router.navigate(['/product/wishlist']);
      return;
    }
    this.isChangeWishList = true;
    this.productService.addToWishList(productId)
      .pipe(
        finalize(() => this.isChangeWishList = false)
      ).subscribe(res => {
        if (res.code == "OK") {
          this.listWishIds.push(productId);
          this.shareService.wishListEmitEvent(this.listWishIds);
        }
      })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.product !== undefined) {
      this.listSize = getListSize(changes.product.currentValue.productDetails);
      this.listColor = getListColor(changes.product.currentValue.productDetails);
      this.colorSelected = this.listColor[0];
      this.sizeSelected = this.listSize[0];
      this.getShippingFeeAndStore(changes.product.currentValue.storeId);
      this.quantity = 1;
    }

  }

  getShippingFeeAndStore(storeId: number) {

    this.listObservable.push(this.storeService.getStoreById(storeId))
    if (this.authService.isAuthenticated()) {
      this.listObservable.push(this.authService.getUserById());
    }

    forkJoin(this.listObservable)
      .subscribe(res => {
        if (res[0].code === "OK") {
          this.storeAddress = JSON.parse(res[0].data.address);
          this.store = res[0].data;
          if (res[1] && res[1].isSuccessed) {
            this.userAddress = res[1].data.address;
            this.calculateShippingFee();
          }
        }
      })
  }

  calculateShippingFee() {
    if (this.userAddress && this.storeAddress) {
      this.ghnService.calculateShippingFee(this.userAddress.districtId, this.storeAddress.districtId)
        .subscribe(res => {
          if (res.code == 200) {
            this.shippingFee = res.data.total / environment.USDToVND;
          }
        });

    }
  }

  addToCart() {
    if (!this.authService.isAuthenticated()) {
      this.shareService.openLoginDrawerEvent();
      return;
    }

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
          this.shareService.cartEmitEvent(res.data);
          this.shareService.openCartDrawerEvent();
        }
      })
  }
}
