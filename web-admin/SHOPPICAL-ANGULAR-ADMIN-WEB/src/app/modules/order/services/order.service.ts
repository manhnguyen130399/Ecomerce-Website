import { Order } from './../model/order';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/modules/common/base-service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { BaseResponse } from '@app/modules/common/base-response';
import { BaseParams } from '@app/modules/common/base-params';

@Injectable({
  providedIn: 'root'
})
export class OrderService implements BaseService<Order> {
  constructor(private readonly httpClient: HttpClient) { }

  getById(id: number) {
    return this.httpClient
      .get(`${environment.productServiceUrl}/api/orders/getById/${id}`)
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }

  create(order: Order): Observable<BaseResponse<Order>> {
    return this.httpClient
      .post<BaseResponse<Order>>(
        `${environment.productServiceUrl}/api/product/create`,
        order
      )
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }

  update(order: Order): Observable<BaseResponse<Order>> {
    console.log(order);

    return this.httpClient
      .put<BaseResponse<Order>>(
        `${environment.productServiceUrl}/api/product`,
        order
      )
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }

  delete(productId: number, baseParams: BaseParams) {
    let params = new HttpParams()
      .append('page', `${baseParams.pageIndex - 1}`)
      .append('pageSize', `${baseParams.pageSize}`);

    if (baseParams.sortField != null) {
      params = params
        .append('sortField', `${baseParams.sortField}`)
        .append('sortOrder', `${baseParams.sortOrder}`);
    }

    if (baseParams.filters.length > 0) {
      baseParams.filters.forEach((filter) => {
        params = params.append(filter.key, filter.value);
      });
    }

    return this.httpClient
      .delete<BaseResponse<Order>>(
        `${environment.productServiceUrl}/api/product/${productId}`,
        { params }
      )
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }

  getAll(baseParams: BaseParams) {
    let params = new HttpParams()
      .append('pageIndex', `${baseParams.pageIndex}`)
      .append('pageSize', `${baseParams.pageSize}`);

    if (baseParams.sortField != null) {
      params = params
        .append('sortField', `${baseParams.sortField}`)
        .append('sortOrder', `${baseParams.sortOrder}`);
    }

    if (baseParams.filters.length > 0) {
      baseParams.filters.forEach((filter) => {
        params = params.append(filter.key, filter.value);
      });
    }

    return this.httpClient
      .get<any>(`${environment.orderServiceUrl}/api/orders/getAll`, { params }
      )
      .pipe(
        catchError((err) => {
          return of(err.error);
        })
      );
  }

  getOrderDetails(orderId: number) {
    return this.httpClient
      .get(`${environment.orderServiceUrl}/api/orders/getOrderDetails/${orderId}`)
      .pipe(
        catchError((err) => {
          return of(err.error);
        })
      );
  }

  updateState(orderId: number, state: string) {
    return this.httpClient
      .get(`${environment.orderServiceUrl}/api/orders/updateState/${orderId}?state=${state}`)
      .pipe(
        catchError((err) => {
          return of(err.error);
        })
      );
  }


}
