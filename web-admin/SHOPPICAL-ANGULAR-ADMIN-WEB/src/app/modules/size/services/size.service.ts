import { BaseParams } from '../../common/base-params';
import { BaseResponse } from '@app/modules/common/base-response';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Size } from '../models/size';
import { BaseService } from '@app/modules/common/base-service';

@Injectable({
  providedIn: 'root'
})
export class SizeService implements BaseService<Size>{

  constructor(private readonly httpClient: HttpClient) { }

  getAll(baseParams: BaseParams) {
    let params = new HttpParams()
      .append('page', `${baseParams.pageIndex - 1}`)
      .append('pageSize', `${baseParams.pageSize}`)

    if (baseParams.sortField != null) {
      params = params.append('sortField', `${baseParams.sortField}`)
        .append('sortOrder', `${baseParams.sortOrder}`);
    }

    if (baseParams.filters.length > 0) {
      baseParams.filters.forEach(filter => {
        params = params.append(filter.key, filter.value);
      });
    }

    return this.httpClient.get(`${environment.productServiceUrl}/api/size`, { params }).pipe(
      catchError(error => {
        return of(error.error);
      })
    )
  }

  getAllStore() {
    return this.httpClient.get(`${environment.productServiceUrl}/api/size/size-all-store`).pipe(
      catchError(error => {
        return of(error.error);
      })
    )
  }

  create(data: Size): Observable<BaseResponse<Size>> {
    return this.httpClient.post<BaseResponse<Size>>(`${environment.productServiceUrl}/api/size/create`, data).pipe(
      catchError(error => {
        return of(error.error);
      })
    )
  }

  delete(sizeId: number, baseParams: BaseParams): Observable<BaseResponse<Size>> {
    let params = new HttpParams()
      .append('page', `${baseParams.pageIndex - 1}`)
      .append('pageSize', `${baseParams.pageSize}`)

    if (baseParams.sortField != null) {
      params = params.append('sortField', `${baseParams.sortField}`)
        .append('sortOrder', `${baseParams.sortOrder}`);
    }

    if (baseParams.filters.length > 0) {
      baseParams.filters.forEach(filter => {
        params = params.append(filter.key, filter.value);
      });
    }
    return this.httpClient.delete<BaseResponse<Size>>(`${environment.productServiceUrl}/api/size/${sizeId}`, { params }).pipe(
      catchError(error => {
        return of(error.error);
      })
    )
  }

}
