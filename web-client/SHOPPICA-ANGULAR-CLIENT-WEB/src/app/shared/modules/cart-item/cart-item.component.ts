import { NzMessageService } from 'ng-zorro-antd/message';
import { ModalService } from './../../../core/services/modal/modal.service';
import { Router } from '@angular/router';
import { OldCartItem } from './../../../core/model/cart/old-cart-item';
import { ProductService } from './../../../core/services/product/product.service';
import { ShareService } from './../../../core/services/share/share.service';
import { finalize } from 'rxjs/operators';
import { CartRequest } from '../../../core/model/cart/cart-request';
import { CartService } from './../../../core/services/cart/cart.service';
import { CartItemOptions } from './models/cart-item-options.model';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '@core/model/cart/cart-item';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() item: CartItem;
  @Input() cartItemOptions: CartItemOptions;
  @Output() loadingEvent = new EventEmitter<boolean>();
  constructor(
    private readonly cartService: CartService,
    private readonly shareService: ShareService,
    private readonly productService: ProductService,
    private readonly modalService: ModalService,
    private readonly router: Router,
  ) { }
  ngOnInit(): void {

  }

  viewProductDetail(id) {
    this.modalService.closeCartDrawerEvent();
    this.modalService.closeQuickShopEvent();
    this.modalService.closeQuickViewEvent();
    this.router.navigate(['/product/detail', id]);
  }

  changeQuantity(quantity: number) {

    const request: CartRequest = {
      productDetailId: this.item.productDetailId,
      price: this.item.price,
      quantity: quantity
    };
    this.loadingEvent.emit(true);
    this.cartService.changeQuantity(request)
      .pipe(
        finalize(() => this.loadingEvent.emit(false))
      )
      .subscribe(res => {
        if (res.isSuccessed) {
          this.item.quantity = quantity;
          this.shareService.cartEmitEvent(res.data);
        }

      });
  }

  deleteItem() {
    const request: CartRequest = {
      productDetailId: this.item.productDetailId,
      quantity: this.item.quantity,
      price: this.item.price
    };
    this.loadingEvent.emit(true);
    this.cartService.deleteCartItem(request)
      .pipe(
        finalize(() => this.loadingEvent.emit(false))
      )
      .subscribe(res => {
        if (res.isSuccessed) {
          this.shareService.cartEmitEvent(res.data);
        }

      });
  }

  editItem() {
    this.loadingEvent.emit(true);
    this.productService.getProductById(this.item.productId)
      .pipe(
        finalize(() => this.loadingEvent.emit(false))
      )
      .subscribe(res => {
        if (res.code == 'OK') {
          this.modalService.openQuickShopEvent(res.data);
          const data: OldCartItem = {
            oldProductDetailId: this.item.productDetailId,
            quantity: this.item.quantity
          };
          this.shareService.editCartItemEvent(data);
        }
      });
  }
}
