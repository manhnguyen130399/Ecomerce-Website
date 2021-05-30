import { BaseParams } from '@modules/common/base-params';
import { Category } from './../models/category';
import { BaseService } from '@app/modules/common/base-service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse } from '@modules/common/base-response';
import { Observable, of } from 'rxjs';
import { environment } from '@env';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class CategoryService implements BaseService<Category> {
  constructor(private readonly httpClient: HttpClient) { }

  create(category: Category): Observable<BaseResponse<Category>> {

    return this.httpClient
      .post<BaseResponse<Category>>(`${environment.productServiceUrl}/api/category/create`, category)
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }

  delete(categoryId: number, baseParams: BaseParams) {
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
      .delete<BaseResponse<Category>>(
        `${environment.productServiceUrl}/api/category/${categoryId}`,
        { params }
      )
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }

  getAllStore() {
    return this.httpClient
      .get<BaseResponse<Category>>(
        `${environment.productServiceUrl}/api/category/category-all-store`,
      )
      .pipe(
        catchError((err) => {
          return of(err.error);
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
      .get<BaseResponse<Category>>(
        `${environment.productServiceUrl}/api/category`,
        { params }
      )
      .pipe(
        catchError((err) => {
          return of(err.error);
        })
      );
  }
}
