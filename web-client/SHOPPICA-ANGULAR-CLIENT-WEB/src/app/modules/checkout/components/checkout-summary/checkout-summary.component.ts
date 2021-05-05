
import { environment } from '@env';
import { StorageService } from '@core/services/storage/storage.service';
import { Component, OnInit } from '@angular/core';
import { ShippingAddress } from '@core/model/user/shipping-address';
import { CheckoutService } from '@core/services/checkout/checkout.service';

@Component({
  selector: 'app-checkout-summary',
  templateUrl: './checkout-summary.component.html',
  styleUrls: ['./checkout-summary.component.css']
})
export class CheckoutSummaryComponent implements OnInit {
  shippingAddress: ShippingAddress;
  subtotal = 0;
  shippingPrice = 0;
  discount = 0;
  constructor(
    private readonly storageService: StorageService,
    private readonly checkoutService: CheckoutService
  ) { }

  ngOnInit(): void {
    this.shippingAddress = this.storageService.getValue<ShippingAddress>(environment.shippingAddressKey);

    this.checkoutService.productPriceEmitted$.subscribe((price: number) => {
      this.subtotal += price;
    });

    this.checkoutService.shippingPriceEmitted$.subscribe((shipping: number) => {
      this.shippingPrice += shipping;
    });

    this.checkoutService.discountEmitted$.subscribe((discount: number) => {
      this.discount += discount;
    });
  }

}
