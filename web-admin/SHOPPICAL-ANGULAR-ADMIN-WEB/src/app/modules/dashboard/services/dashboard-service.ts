import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse } from '@app/modules/common/base-response';
import { environment } from '@env';
import { Report } from '../models/report';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private readonly httpClient: HttpClient) { }

  getData(fromDate: string, toDate: string, top: number) {
    let params = new HttpParams()
      .append('fromDate', fromDate)
      .append('toDate', toDate)
      .append('TOP', top.toString())
      .append('sortOrder', 'ascend');
    return this.httpClient
      .get<BaseResponse<Report>>(
        `${environment.productServiceUrl}/api/report/by-date`,
        { params }
      )
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }

  exportExcel(fromDate: string, toDate: string, top: number) {
    let params = new HttpParams()
      .append('fromDate', fromDate)
      .append('toDate', toDate)
      .append('Top', top.toString())
      .append('sortOrder', 'ascend');
    return this.httpClient
      .get(
        `${environment.productServiceUrl}/api/report/export-excel`, { responseType:'blob', params })

      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }
}
