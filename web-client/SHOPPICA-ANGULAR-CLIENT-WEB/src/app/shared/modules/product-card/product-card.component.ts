import { AuthService } from './../../../core/services/auth/auth.service';
import { ModalService } from './../../../core/services/modal/modal.service';
import { finalize } from 'rxjs/operators';
import { ProductService } from '@core/services/product/product.service';
import { ShareService } from './../../../core/services/share/share.service';
import { Color } from '@core/model/color/color';
import { ProductDetail } from '@core/model/product/product-detail';
import { Size } from '@core/model/size/size';
import { Product } from '@core/model/product/product';
import { Component, Input, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { getListColor, getListSize } from '@core/model/product/product-helper';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  @Output() removeFromWishListEvent = new EventEmitter<number>();
  listColor: Color[] = [];
  listSize: Size[] = [];
  listWishIds = [];
  sizeSelected: Size;
  colorSelected: Color;
  image: string;
  sizes = '';
  inWishList = false;
  isChangeWishList = false;
  constructor(
    private readonly shareService: ShareService,
    private readonly productService: ProductService,
    private readonly modalService: ModalService,
    private readonly authService: AuthService
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
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.product !== undefined) {
      this.listSize = getListSize(changes.product.currentValue.productDetails);
      this.listColor = getListColor(changes.product.currentValue.productDetails);
      this.colorSelected = this.listColor[0];
      this.image = changes.product.currentValue.productImages[0].image;
      this.sizes = this.listSize.map(x => x.sizeName).join(', ');

    }
  }

  openQuickView(product: Product) {
    this.modalService.openQuickViewEvent(product);
  }

  openQuickShop(product: Product) {
    this.modalService.openQuickShopEvent(product);
  }

  addToWishList(productId: number) {
    if (!this.authService.isAuthenticated()) {
      this.modalService.openLoginDrawerEvent();
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

  removeWishList(productId: number) {
    this.isChangeWishList = true;
    this.productService.removeWishList(productId).pipe(
      finalize(() => this.isChangeWishList = false)
    ).subscribe(res => {
      if (res.code == 'OK') {
        this.shareService.wishListEmitEvent(this.listWishIds.filter(x => x !== productId));
        this.removeFromWishListEvent.emit(productId);
      }
    });
  }
}
