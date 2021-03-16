import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseParams } from '@app/modules/common/base-params';
import { BaseResponse } from '@app/modules/common/base-response';
import { BaseService } from '@app/modules/common/base-service';
import { environment } from '@env';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Promotion } from '../model/promotion';

@Injectable({
  providedIn: 'root'
})
export class PromotionService implements BaseService<Promotion> {
  constructor(private readonly httpClient: HttpClient) { }

  create(promotion: Promotion): Observable<BaseResponse<Promotion>> {

    return this.httpClient
      .post<BaseResponse<Promotion>>(`${environment.productServiceUrl}/api/promotion/create`, promotion)
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }

  delete(promotionId: number, baseParams: BaseParams) {
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

    return this.httpClient
      .delete<BaseResponse<Promotion>>(
        `${environment.productServiceUrl}/api/promotion/${promotionId}`,
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

    return this.httpClient
      .post<BaseResponse<Promotion>>(
        `${environment.productServiceUrl}/api/promotion`, {},
        { params }
      )
      .pipe(
        catchError((err) => {
          return of(err.error);
        })
      );
  }
}
