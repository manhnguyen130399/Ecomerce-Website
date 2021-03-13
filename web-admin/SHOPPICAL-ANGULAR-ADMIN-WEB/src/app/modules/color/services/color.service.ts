import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from '@env';
import { Color } from '../models/Color';
import { BaseResponse } from '@app/models/base-response';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ColorService {
  constructor(private readonly httpClient: HttpClient) {}

  getColors(
    pageIndex: number,
    pageSize: number,
    colorName: string | null,
    sortField: string | null,
    sortOrder: string | null
  ) {

    let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('pageSize', `${pageSize}`);

    if (colorName) {
      params = params.append('colorName', colorName);
    }
    if (sortField) {
      params = params.append('sortField', sortField);
    }
    if (sortOrder) {
      params = params.append('sortOrder', sortOrder);
    }
    return this.httpClient
      .get<BaseResponse<Color>>(`${environment.productServiceUrl}/api/color`, {
        params,
      })
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }

  deleteColor(colorId: number) {
    return this.httpClient
      .delete<BaseResponse<Color>>(
        `${environment.productServiceUrl}/api/color/${colorId}`
      )
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }

  createColor(colorName: string) {
    const body = {
      colorName: colorName,
    };
    return this.httpClient
      .post<BaseResponse<Color>>(
        `${environment.productServiceUrl}/api/color/create`,
        body
      )
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }
}
