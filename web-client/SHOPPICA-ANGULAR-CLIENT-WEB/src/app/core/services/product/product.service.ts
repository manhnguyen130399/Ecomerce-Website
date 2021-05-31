import { JwtService } from './../jwt/jwt.service';
import { catchError } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { ProductOptions } from './../../model/product/product-option';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseParams } from '@core/model/base-params';
import { of } from 'rxjs';
import { ProductSort } from '@core/model/product/product-sort';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly jwtService: JwtService
  ) { }

  getListProduct(productOption: ProductOptions, baseParams: BaseParams) {
    const params = new HttpParams()
      .append('page', `${baseParams.pageIndex}`)
      .append('pageSize', `${baseParams.pageSize}`);

    return this.httpClient.post(`${environment.productServiceUrl}/api/product/product-all-store`, productOption,
      { params }).pipe(
        catchError(error => {
          return of(error.error);
        })
      );
  }

  getListNewArrival(pageIndex: number, pageSize: number) {
    const params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('pageSize', `${pageSize}`);

    let productOptions = new ProductOptions();
    productOptions.sortType = ProductSort.NEW_OLD;

    return this.httpClient.post(`${environment.productServiceUrl}/api/product/product-all-store`, productOptions,
      { params }).pipe(
        catchError(error => {
          return of(error.error);
        })
      );
  }

  getProductById(id: number) {
    return this.httpClient.get(`${environment.productServiceUrl}/api/product/${id}`).pipe(
      catchError(error => {
        return of(error.error);
      })
    );
  }

  getProductBestSellerByStore(top?: number, storeId?: number) {
    let params = new HttpParams();
    if (storeId) {
      params = params.append('storeId', storeId.toString());
    }
    if (top) {
      params = params.append('top', top.toString());
    }
    return this.httpClient.get(`${environment.productServiceUrl}/api/product/best-seller`, { params }).pipe(catchError(error => {
      return of(error.error);
    }));
  }

  getProductRecommender() {
    const userId = this.jwtService.getAccountId();
    return this.httpClient.get(`${environment.recommendationServiceUrl}/predict/${userId}/`).pipe(catchError(error => {
      return of(error.error);
    }));
  }

  getProductByStore(pageIndex: number, pageSize: number, body: Object) {
    const params = new HttpParams()
      .append('page', (pageIndex - 1).toString())
      .append('pageSize', pageSize.toString());
    return this.httpClient.post(`${environment.productServiceUrl}/api/product`, body, { params }).pipe(catchError(error => {
      return of(error.error);
    }));
  }

  searchProductByFullText(pageIndex: number, pageSize: number, keyword: string) {
    const params = new HttpParams().append('page', (pageIndex - 1).toString())
      .append('pageSize', pageSize.toString())
      .append('keyword', keyword);
    return this.httpClient.get(`${environment.productServiceUrl}/api/product/fulltext-search`, { params }).pipe(catchError(error => {
      return of(error.error);
    }));
  }

  addToWishList(productId: number) {
    const body = {};
    const params = new HttpParams()
      .append('productId', `${productId}`);

    return this.httpClient.post(`${environment.productServiceUrl}/api/wish-list/create`, body, { params }).pipe(
      catchError(error => {
        return of(error.error);
      })
    );
  }


  removeWishList(productId: number) {
    return this.httpClient.delete(`${environment.productServiceUrl}/api/wish-list/${productId}`).pipe(
      catchError(error => {
        return of(error.error);
      })
    );
  }

  getWishList(baseParams?: BaseParams) {

    const params = new HttpParams();
    if (baseParams) {
      params.append('page', `${baseParams.pageIndex}`);
      params.append('pageSize', `${baseParams.pageSize}`);
    }

    return this.httpClient.get(`${environment.productServiceUrl}/api/wish-list`, { params }).pipe(
      catchError(error => {
        return of(error.error);
      })
    );
  }
}

