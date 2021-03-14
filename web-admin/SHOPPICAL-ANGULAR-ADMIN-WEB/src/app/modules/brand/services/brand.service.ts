import { Brand } from './../models/brand';
import { BaseResponse } from '@models/base-response';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private readonly httpClient: HttpClient) { }

  getBrands(pageIndex: number, pageSize: number, sortField: string | null,
    sortOrder: string | null, filters: Array<{ key: string; value: string }>) {
    let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('pageSize', `${pageSize}`)

    if (sortField != null) {
      params = params.append('sortField', `${sortField}`)
        .append('sortOrder', `${sortOrder}`);
    }

    if (filters.length > 0) {
      filters.forEach(filter => {
        params = params.append(filter.key, filter.value);
      });
    }

    return this.httpClient.get(`${environment.productServiceUrl}/api/brand`, { params }).pipe(
      catchError(error => {
        return of(error.error);
      })
    )
  }

  createBrand(brandName: string): Observable<BaseResponse<Brand>> {
    const request = {
      brandName: brandName
    }
    return this.httpClient.post<BaseResponse<Brand>>(`${environment.productServiceUrl}/api/brand/create`, request).pipe(
      catchError(error => {
        return of(error.error);
      })
    )
  }

  deleteBrand(brandId: number): Observable<BaseResponse<Brand>> {
    return this.httpClient.delete<BaseResponse<Brand>>(`${environment.productServiceUrl}/api/brand/${brandId}`).pipe(
      catchError(error => {
        return of(error.error);
      })
    )
  }

}
