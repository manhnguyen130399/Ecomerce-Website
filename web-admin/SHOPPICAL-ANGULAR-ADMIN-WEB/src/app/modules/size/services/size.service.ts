import { BaseResponse } from '@models/base-response';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Size } from '../models/size';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  constructor(private readonly httpClient: HttpClient) { }

  getSizes(pageIndex: number, pageSize: number, sortField: string | null,
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

    return this.httpClient.get(`${environment.productServiceUrl}/api/size`, { params }).pipe(
      catchError(error => {
        return of(error.error);
      })
    )
  }

  createSize(sizeName: string): Observable<BaseResponse<Size>> {
    const request = {
      sizeName: sizeName
    }
    return this.httpClient.post<BaseResponse<Size>>(`${environment.productServiceUrl}/api/size/create`, request).pipe(
      catchError(error => {
        return of(error.error);
      })
    )
  }

  deleteSize(sizeId: number): Observable<BaseResponse<Size>> {
    return this.httpClient.delete<BaseResponse<Size>>(`${environment.productServiceUrl}/api/size/${sizeId}`).pipe(
      catchError(error => {
        return of(error.error);
      })
    )
  }

}
