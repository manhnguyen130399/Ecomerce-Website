import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseParams } from '@app/modules/common/base-params';
import { BaseService } from '@app/modules/common/base-service';
import { Complain } from '../models/complain';
import { catchError } from 'rxjs/operators';
import { environment } from '@env';
import { BaseResponse } from '@modules/common/base-response';
import { BehaviorSubject, of } from 'rxjs';
import { NzTableInnerScrollComponent } from 'ng-zorro-antd/table';
import { complainRoutes } from '../complain.routing';
@Injectable({
  providedIn: 'root',
})
export class ComplainService implements BaseService<Complain> {
  id = new BehaviorSubject<number>(null);
  constructor(private readonly httpClient: HttpClient) {}

  changeSource(id: number) {
    this.id.next(id);
  }

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
      .get<BaseResponse<Complain>>(
        `${environment.productServiceUrl}/api/complain`,
        {
          params,
        }
      )
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }

  getComplainById(complainId: number) {
    return this.httpClient
      .get<BaseResponse<Complain>>(
        `${environment.productServiceUrl}/api/complain/${complainId}`
      )
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }

  replyComplain(complainId: number, message: string) {
    return this.httpClient
      .post<BaseResponse<Complain>>(
        `${environment.productServiceUrl}/api/complain/reply/${complainId}`,
        message
      )
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }

  create() {
    return null;
  }
  delete() {
    return null;
  }
}
