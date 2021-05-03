import { OrderGroup } from '../../model/order/order-group';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Order } from '../../model/order/order';
import { of, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private productPrice = new Subject<number>();
  private shippingPrice = new Subject<number>();
  private discount = new Subject<number>();
  private step = new Subject<number>();
  private orderGroup = new Subject<OrderGroup>();

  productPriceEmitted$ = this.productPrice.asObservable();
  shippingPriceEmitted$ = this.shippingPrice.asObservable();
  discountEmitted$ = this.discount.asObservable();
  stepEmitted$ = this.step.asObservable();
  orderGroupEmitted$ = this.orderGroup.asObservable();

  productPriceChange(price: number) {
    this.productPrice.next(price);
  }

  shippingPriceChange(price: number) {
    this.shippingPrice.next(price);
  }

  discountChange(price: number) {
    this.discount.next(price);
  }

  stepChange(currentStep: number) {
    this.step.next(currentStep);
  }

  orderGroupEmitted(orderGroup: OrderGroup) {
    this.orderGroup.next(orderGroup);
  }

  constructor(private readonly httpClient: HttpClient) { }


  createOrder(order: Order) {
    return this.httpClient.post(`${environment.orderServiceUrl}/api/orders/create`, order).pipe(
      catchError(error => {
        return of(error.error);
      })
    );
  }

  getOrderByEmail(email: string) {
    return this.httpClient.get(`${environment.orderServiceUrl}/api/orders/GetAllByUser/${email}`).pipe(
      catchError(error => {
        return of(error.error);
      })
    );
  }

  getOrderDetailById(id: number) {
    return this.httpClient.get(`${environment.orderServiceUrl}/api/orders/GetOrderDetails/${id}`).pipe(
      catchError(error => {
        return of(error.error);
      })
    );
  }
}
