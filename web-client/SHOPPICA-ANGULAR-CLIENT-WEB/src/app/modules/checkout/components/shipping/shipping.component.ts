import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ProductGroupComponent } from './../product-group/product-group.component';
import { PaymentComponent } from './../payment/payment.component';
import { OrderGroup } from '../../../../core/model/order/order-group';
import { StorageService } from './../../../../core/services/storage/storage.service';
import { CheckoutService } from '@core/services/checkout/checkout.service';
import { LoaderService } from './../../../../shared/modules/loader/loader.service';
import { Store } from '@core/model/store/store';
import { StoreService } from '@core/services/store/store.service';
import { CartGroup } from '@core/model/cart/cart-group';
import { ShippingAddress } from './../../../../core/model/user/shipping-address';
import { ShareService } from '@core/services/share/share.service';

import { Cart } from '../../../../core/model/cart/cart';
import { Component, EventEmitter, OnInit, Output, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { environment } from '@env';
import { Order } from '@core/model/order/order';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
  @ViewChildren(ProductGroupComponent) productGroupComponents: QueryList<ProductGroupComponent>;
  @ViewChild(PaymentComponent) paymentComponent: PaymentComponent;
  cartGroups: CartGroup[];
  orderGroups: OrderGroup[] = [];
  shippingAddress: ShippingAddress;
  cart: Cart;
  isCreatingOrder = false;
  constructor(
    private readonly shareService: ShareService,
    private readonly loaderService: LoaderService,
    private readonly checkoutService: CheckoutService,
    private readonly storageService: StorageService,
    private readonly router: Router,
    private readonly messageService: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.shippingAddress = this.storageService.getValue<ShippingAddress>(environment.shippingAddressKey);
    this.loaderService.showLoader('checkout');
    this.getCart();
    this.checkoutService.stepChange(2);
    this.checkoutService.orderGroupEmitted$.subscribe((orderGroup: OrderGroup) => {
      this.orderGroups.push(orderGroup);
    });
  }

  getCart() {
    this.shareService.cartEmitted$.subscribe((cart) => {
      this.cart = cart;
      this.cartGroups = [];
      const listStoreId = this.getListStore(cart);
      listStoreId.forEach(id => {
        const cartGroup: CartGroup = {
          storeId: id,
          cartItems: this.cart.cartItems.filter(x => x.storeId == id && x.quantity <= x.available)
        };
        this.cartGroups.push(cartGroup);
      });
    });
  }

  getListStore(cart: Cart) {
    const distinctStoreId = new Set<number>();
    cart.cartItems.filter(x => x.quantity <= x.available)
      .forEach(element => {
        distinctStoreId.add(element.storeId);
      });

    return [...distinctStoreId];
  }

  createOrder() {
    this.isCreatingOrder = true;
    this.productGroupComponents.toArray().forEach(x => {
      x.emittedOrderGroup()
    });
    const order: Order = {
      ...this.shippingAddress,
      ...this.paymentComponent.getPaymentMethod(),
      OrderOneStores: [
        ...this.orderGroups
      ]
    };

    this.checkoutService.createOrder(order).pipe(
      finalize(() => this.isCreatingOrder = false)
    ).subscribe(res => {
      if (res.isSuccessed) {
        this.storageService.remove(environment.shippingAddressKey);
        this.router.navigate(['/home']);
        this.messageService.success('Order successfully!');
        this.cart.cartItems = this.cart.cartItems.filter(x => x.quantity > x.available);
        this.cart.total = 0;
        this.shareService.changeNumCartItemEvent(this.cart.cartItems.length);
      }
    });
  }
}
