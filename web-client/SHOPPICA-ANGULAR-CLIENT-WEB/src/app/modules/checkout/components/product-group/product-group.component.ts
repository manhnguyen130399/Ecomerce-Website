import { finalize } from 'rxjs/operators';
import { OrderGroup } from '../../../../core/model/order/order-group';

import { LoaderService } from '@shared/modules/loader/loader.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { StorageService } from '@core/services/storage/storage.service';
import { ShareService } from '@core/services/share/share.service';
import { GhnService } from '@core/services/ghn/ghn.service';
import { ShippingAddress } from '@core/model/user/shipping-address';
import { Store } from '@core/model/store/store';
import { StoreService } from '@core/services/store/store.service';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { CartGroup } from '@core/model/cart/cart-group';
import { environment } from '@env';
import { CheckoutService } from '@core/services/checkout/checkout.service';
import { Promotion } from '@core/model/promotion/promotion';

@Component({
  selector: 'app-product-group',
  templateUrl: './product-group.component.html',
  styleUrls: ['./product-group.component.css']
})
export class ProductGroupComponent implements OnInit {

  visible = false;
  shippingFee: number;
  promotionInUse: Promotion;
  store: Store;
  couponForm: FormGroup;
  shippingAddress: ShippingAddress;
  @Input() cartGroup: CartGroup;
  constructor(
    private readonly storeService: StoreService,
    private readonly formBuilder: FormBuilder,
    private readonly ghnService: GhnService,
    private readonly storageService: StorageService,
    private readonly loaderService: LoaderService,
    private readonly checkoutService: CheckoutService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.shippingAddress = this.storageService.getValue<ShippingAddress>(environment.shippingAddressKey);
  }

  buildForm() {
    this.couponForm = this.formBuilder.group({
      couponCode: [null]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.cartGroup) {
      this.getStore(changes.cartGroup.currentValue.storeId);
    }
  }

  getStore(id: number) {
    this.storeService.getStoreById(id).pipe(
      finalize(() => this.loaderService.hideLoader('checkout'))
    ).subscribe(res => {
      if (res.code === 'OK') {
        this.store = res.data;
        this.store.address = JSON.parse(res.data.address);
        this.calculateShippingFee();
        this.checkoutService.productPriceChange(this.getTotalPrice());
      }
    });
  }

  getTotalPrice() {
    return this.cartGroup.cartItems.map(x => x.price * x.quantity)
      .reduce((a, b) => a + b);
  }

  calculateShippingFee() {
    this.ghnService.calculateShippingFee(
      this.shippingAddress.address.districtId,
      this.store.address.districtId)
      .subscribe(res => {
        if (res.code == 200) {
          this.shippingFee = Math.round(res.data.total / environment.USDToVND);
          this.checkoutService.shippingPriceChange(this.shippingFee);
        }
      });
  }

  useCouponCode() {
    const code = this.couponForm.controls.couponCode.value;
    const validCoupons = this.store.promotions.filter(
      x => x.code == code
    );

    if (validCoupons.length > 0) {
      this.promotionInUse = validCoupons[0];
      this.checkoutService.discountChange(this.promotionInUse.discount);
    }
    else {
      if (this.promotionInUse) {
        this.checkoutService.discountChange(-this.promotionInUse.discount);
      }
      this.promotionInUse = null;
      this.couponForm.controls.couponCode.setErrors({ incorrect: true });
    }

  }

  emittedOrderGroup() {
    const orderDetails = this.cartGroup.cartItems.map(element => {
      return {
        productDetailId: element.productDetailId,
        productName: element.productName,
        quantity: element.quantity,
        totalPriceProduct: element.quantity * element.price
      };
    });

    const orderGroup: OrderGroup = {
      notes: '',
      total: this.cartGroup.cartItems.map(x => x.price * x.quantity).reduce((a, b) => a + b),
      storeId: this.cartGroup.storeId,
      discount: this.promotionInUse?.discount,
      promotionId: this.promotionInUse?.id,
      shippingCost: this.shippingFee,
      orderDetails
    };
    this.checkoutService.orderGroupEmitted(orderGroup);
  }

}
