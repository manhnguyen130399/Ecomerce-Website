import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse } from '@core/model/base-response';
import { Store } from '@core/model/store/store';
import { environment } from '@env';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreInfoService {

  constructor(private readonly httpClient: HttpClient) { }

  getStoreInfoById(id: number) {
    return this.httpClient.get<BaseResponse<Store>>(`${environment.productServiceUrl}/api/store/${id}`).pipe(catchError((error) => {
      return of(error.error);
    }));
  }

  getOrderState(id: number) {
    const params = new HttpParams().append('storeId', id.toString());
    return this.httpClient.get(`${environment.orderServiceUrl}/api/orders/getBestSeller`, { params }).pipe(catchError((error) => {
      return of(error.error);
    }));
  }
}
