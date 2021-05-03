import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse } from '@core/model/base-response';
import { Blog } from '@core/model/blog/blog';
import { environment } from '@env';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private readonly httpClient: HttpClient) { }

  getAllBlog(pageIndex: number, pageSize: number, type?: string) {
    let params = new HttpParams()
      .append('page', (pageIndex - 1).toString())
      .append('pageSize', pageSize.toString());
    if (type) {
      params = params.append('type', type);
    }

    return this.httpClient
      .get<BaseResponse<Blog>>(`${environment.productServiceUrl}/api/blog/complete`, {
        params,
      })
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }

  getDataForSideBlog() {
    return this.httpClient.get(`${environment.productServiceUrl}/api/blog/blog-all-store`).pipe(
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
