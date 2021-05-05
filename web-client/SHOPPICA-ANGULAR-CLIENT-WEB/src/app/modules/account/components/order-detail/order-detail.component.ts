import { LoaderService } from './../../../../shared/modules/loader/loader.service';
import { OrderResponse } from './../../../../core/model/order/order-response';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '@core/services/checkout/checkout.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order: OrderResponse;
  isLoading = false;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly checkoutService: CheckoutService,
    private readonly loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.loaderService.showLoader('order-detail');
    this.activatedRoute.params.pipe(
      switchMap(params => {
        return this.checkoutService.getOrderDetailById(params.id);
      })
    ).subscribe(res => {
      if (res.isSuccessed) {
        this.order = res.data;
        console.log(this.order.discount);
      }
      this.isLoading = false;
      this.loaderService.hideLoader('order-detail');
    });
  }

}
