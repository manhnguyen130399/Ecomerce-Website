import { finalize } from 'rxjs/operators';
import { OrderResponse } from './../../../../core/model/order/order-response';
import { CheckoutService } from './../../../../core/services/checkout/checkout.service';
import { JwtService } from './../../../../core/services/jwt/jwt.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders: OrderResponse[];
  isLoading = false;
  constructor(
    private readonly jwtService: JwtService,
    private readonly checkoutService: CheckoutService
  ) { }

  ngOnInit(): void {
    const email = this.jwtService.getUserName();
    this.isLoading = true;
    this.checkoutService.getOrderByEmail(email).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(res => {
      if (res.isSuccessed) {
        this.orders = res.data;
      }
    });
  }

}
