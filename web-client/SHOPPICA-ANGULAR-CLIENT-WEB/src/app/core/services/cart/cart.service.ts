import { Cart } from './../../model/cart/cart';
import { StorageService } from './../storage/storage.service';
import { CartRequest } from '../../model/cart/cart-request';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '@env';
import { CartItemUpdate } from '@core/model/cart/cart-item-update';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly storageService: StorageService
  ) { }

  addToCart(request: CartRequest) {
    return this.httpClient.post(`${environment.orderServiceUrl}/api/carts/addToCart`, request).pipe(
      catchError(error => {
        return of(error.error);
      })
    );


  }

  getCartById() {
    return this.httpClient.get(`${environment.orderServiceUrl}/api/carts/getCart`).pipe(
      catchError(error => {
        return of(error.error);
      })
    );

  }


  changeQuantity(request: CartRequest) {
    return this.httpClient.post(`${environment.orderServiceUrl}/api/carts/changeQuantity`, request).pipe(
      catchError(error => {
        return of(error.error);
      })
    );
  }

  updateCart(request: CartItemUpdate) {
    return this.httpClient.post(`${environment.orderServiceUrl}/api/carts/updateCart`, request).pipe(
      catchError(error => {
        return of(error.error);
      })
    );
  }

  deleteCartItem(request: CartRequest) {
    return this.httpClient.post(`${environment.orderServiceUrl}/api/carts/deleteCartItem`, request).pipe(
      catchError(error => {
        return of(error.error);
      })
    );
  }
}
