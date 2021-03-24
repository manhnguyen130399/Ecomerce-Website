import { Seller } from './../model/seller';
import { environment } from '@env';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UtilitiesService } from '@core/services/utilities/utilities.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '../model/store';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly utilitiesService: UtilitiesService) { }

  getSellerDetail() {
    return this.httpClient.get(`${environment.userServiceUrl}/api/users/GetSellerById`).pipe(
      catchError(error => {
        return of(error.error);
      })
    )
  }

  updateSellerInfo(sellerInfo: Seller) {
    return this.httpClient.patch(`${environment.userServiceUrl}/api/users/updateInfoForSeller`, sellerInfo).pipe(
      catchError(error => {
        return of(error.error);
      })
    )
  }

  getStoreDetail() {
    const storeId = this.utilitiesService.getStoreId();
    return this.httpClient.get(`${environment.productServiceUrl}/api/store/${storeId}`).pipe(
      catchError(error => {
        return of(error.error);
      })
    )
  }

  updateStoreInfo(storeInfo: Store) {
    const storeId = this.utilitiesService.getStoreId();
    return this.httpClient.put(`${environment.productServiceUrl}/api/store/${storeId}`, storeInfo).pipe(
      catchError(error => {
        return of(error.error);
      })
    )
  }

  changePassword(changePasswordObject) {
    return this.httpClient.post(`${environment.userServiceUrl}/api/users/changePassword`, changePasswordObject).pipe(
      catchError(error => {
        return of(error.error);
      })
    )
  }
}
