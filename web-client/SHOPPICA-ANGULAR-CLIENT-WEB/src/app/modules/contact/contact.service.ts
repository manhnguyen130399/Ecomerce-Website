import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse } from '@core/model/base-response';
import { Complain } from '@core/model/complain/complain';
import { environment } from '@env';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private readonly httpClient: HttpClient) { }

  createContact(body: Complain) {
    return this.httpClient
      .post<BaseResponse<Complain>>(
        `${environment.productServiceUrl}/api/complain/create`,
        body
      )
      .pipe(
        catchError((error) => {
          return of(error.error);
        })
      );
  }
}
