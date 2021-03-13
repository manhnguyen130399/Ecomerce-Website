import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse } from '@app/models/base-response';
import { Observable, of } from 'rxjs';
import { Category } from '../models/category';
import { environment } from '@env';
import { catchError, tap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private readonly httpClient: HttpClient) {}

  createCategory(form: FormGroup): Observable<BaseResponse<Category>> {

    const body = new FormData();
    body.append('categoryName', form.get('categoryName').value);
    body.append('file', form.get('file').value);

    return this.httpClient
      .post<BaseResponse<Category>>(
        `${environment.productServiceUrl}/category/create`,
        body
      )
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }

  deleteCategory(categoryId: number): Observable<BaseResponse<Category>> {
    return this.httpClient
      .delete<BaseResponse<Category>>(
        `${environment.productServiceUrl}/category/${categoryId}`
      )
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }
  getCategories(
    pageIndex: number | null,
    pageSize: number | null,
    categoryName: string,
    sortField: string,
    sortOrder: string
  ) {
    let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('pageSize', `${pageSize}`);
    if (categoryName != null) {
      params = params.append('categoryName', categoryName);
    }
    if (sortField != null) {
      params = params.append('sortField', sortField);
    }
    if (sortOrder != null) {
      params = params.append('sortOrder', sortOrder);
    }
    return this.httpClient
      .get<BaseResponse<Category>>(
        `${environment.productServiceUrl}/category`,
        { params }
      )
      .pipe(
        catchError((err) => {
          return of(err.error);
        })
      );
  }
}
