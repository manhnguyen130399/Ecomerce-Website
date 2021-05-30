import { Color } from '@modules/color/models/Color';
import { BaseParams } from '@modules/common/base-params';
import { BaseService } from '@app/modules/common/base-service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from '@env';
import { Observable, of } from 'rxjs';
import { BaseResponse } from '@modules/common/base-response';

@Injectable({
  providedIn: 'root',
})

export class ColorService implements BaseService<Color> {
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
    return this.httpClient.get<BaseResponse<Color>>(`${environment.productServiceUrl}/api/color`, {
      params,
    })
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }

  getColorAllStore() {
    return this.httpClient.get<BaseResponse<Color>>(`${environment.productServiceUrl}/api/color/color-all-store`)
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }

  delete(colorId: number, baseParams: BaseParams) {
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
      .delete<BaseResponse<Color>>(`${environment.productServiceUrl}/api/color/${colorId}`, { params }).pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }

  create(color: Color): Observable<BaseResponse<Color>> {
    return this.httpClient
      .post<BaseResponse<Color>>(`${environment.productServiceUrl}/api/color/create`, color)
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }
}
