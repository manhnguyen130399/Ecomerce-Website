import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/modules/common/base-service';
import { Store } from '../models/store';
import { BaseParams } from '../../common/base-params';
import { Observable, of } from 'rxjs';
import { BaseResponse } from '@app/modules/common/base-response';
import { environment } from '@env';
import { catchError, tap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class StoreService implements BaseService<Store> {
  constructor(private readonly httpClient: HttpClient) { }

  getAll(baseParams: BaseParams) {
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
      .get<any>(`${environment.productServiceUrl}/api/store`, {
        params
      })
      .pipe(
        map(res => {
          if (res.code == "OK") {
            res.data.content.map(x => {
              x.address = JSON.parse(x.address);
              return x;
            })
          }
          return res;
        }),
        catchError((error) => {
          return of(error.error);
        })
      );
  }

  create(data: Store): Observable<BaseResponse<Store>> {
    return null;
  }

  delete(id: number, baseParams: BaseParams) {
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
      .delete<BaseResponse<Store>>(
        `${environment.productServiceUrl}/api/store/${id}`,
        { params }
      )
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }
}
