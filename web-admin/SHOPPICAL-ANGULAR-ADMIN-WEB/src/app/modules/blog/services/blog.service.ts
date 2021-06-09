import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseParams } from '@app/modules/common/base-params';
import { BaseResponse } from '@app/modules/common/base-response';
import { BaseService } from '@app/modules/common/base-service';
import { Blog } from '../models/Blog';
import { environment } from '@env';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { blogRoutes } from '../blog.routing';

@Injectable({
  providedIn: 'root',
})
export class BlogService implements BaseService<Blog> {
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
      .get<BaseResponse<Blog>>(`${environment.productServiceUrl}/api/blog`, {
        params,
      })
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }

  create(data: Blog): Observable<BaseResponse<Blog>> {
    return this.httpClient
      .post<BaseResponse<Blog>>(
        `${environment.productServiceUrl}/api/blog/create`,
        data
      )
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
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
      .delete<BaseResponse<Blog>>(
        `${environment.productServiceUrl}/api/blog/${id}`,
        { params }
      )
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }

  update(id: number, blog: Blog) {
    return this.httpClient
      .put<BaseResponse<Blog>>(
        `${environment.productServiceUrl}/api/blog/${id}`,
        blog
      )
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }

  getBlogState() {
    return this.httpClient
      .get(`${environment.productServiceUrl}/api/blog/blog-state`)
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }

  getBlogTypes() {
    return this.httpClient
      .get(`${environment.productServiceUrl}/api/blog/blog-type`)
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );

  }

  getBlogById(id: number) {
    return this.httpClient.get(`${environment.productServiceUrl}/api/blog/${id}`).pipe(
      catchError((error) => {
        return of(error.error);
      })
    );
  }
}
