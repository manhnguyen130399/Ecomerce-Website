import { catchError } from 'rxjs/operators';
import { Notify } from '@models/notifies/notify';
import { BaseResponse } from '@app/modules/common/base-response';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilitiesService } from '../utilities/utilities.service';
import { environment } from '@env';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly utilitiesService: UtilitiesService) { }

  getAllNotify(): Observable<BaseResponse<any>> {
    const storeId = this.utilitiesService.getStoreId();

    let params = new HttpParams()
      .append('storeId', `${storeId}`)
      .append("pageIndex", "0")
      .append("pageSize", "10")
      .append("sortField", "id")
      .append("sortOrder", "descend")

    return this.httpClient.get<BaseResponse<any>>(`${environment.orderServiceUrl}/api/notifies/GetAll`, { params }).pipe(
      catchError(error => {
        return of(error.error);
      })
    )
  }

  updateNumUnread() {
    const storeId = this.utilitiesService.getStoreId();
    let params = new HttpParams()
      .append('storeId', `${storeId}`)

    return this.httpClient.get<BaseResponse<any>>(`${environment.orderServiceUrl}/api/notifies/UpdateNumUnRead`, { params }).pipe(
      catchError(error => {
        return of(error.error);
      })
    )
  }
}
