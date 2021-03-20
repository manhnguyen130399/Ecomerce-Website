import { BehaviorSubject } from 'rxjs';
import { ProductSearch } from './../model/product-search';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { BaseService } from '@app/modules/common/base-service';
import { Product } from '../model/product';
import { BaseResponse } from '@app/modules/common/base-response';
import { BaseParams } from '@app/modules/common/base-params';
@Injectable({
  providedIn: 'root',
})
export class ProductService implements BaseService<Product> {
  constructor(private readonly httpClient: HttpClient) {}

  getById(id: number) {
    return this.httpClient
      .get(`${environment.productServiceUrl}/api/product/${id}`)
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }

  create(product: Product): Observable<BaseResponse<Product>> {
    return this.httpClient
      .post<BaseResponse<Product>>(
        `${environment.productServiceUrl}/api/product/create`,
        product
      )
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }

  update(product: Product): Observable<BaseResponse<Product>> {
    console.log(product);

    return this.httpClient
      .put<BaseResponse<Product>>(
        `${environment.productServiceUrl}/api/product`,
        product
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
      .delete<BaseResponse<Product>>(
        `${environment.productServiceUrl}/api/product/${productId}`,
        { params }
      )
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }

  getAll(baseParams: BaseParams, productSearch?: ProductSearch) {
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
      .post<any>(
        `${environment.productServiceUrl}/api/product`,
        productSearch != undefined ? productSearch : {},
        { params }
      )
      .pipe(
        map((res) => {
          res.data.content.forEach((element) => {
            if (element.productImages.length == 0) {
              element.productImages.push({
                image:
                  'https://drive.google.com/thumbnail?id=1KXVcuCEi-aYgrJXkUwV_RODDh5cT5qHv',
              });
            }
          });
          return res;
        }),
        catchError((err) => {
          return of(err.error);
        })
      );
  }

  deleteImage(id: number) {
    return this.httpClient
      .delete<BaseResponse<string>>(
        `${environment.productServiceUrl}/api/product/image/${id}`
      )
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }
}
