import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseResponse } from '@models/base-response';
import { environment } from '@env';
import { map, catchError } from 'rxjs/operators';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
    private readonly httpClient: HttpClient,) {
  }

  checkStoreExist(email: string): Observable<ValidationErrors> {
    return this.httpClient.get<BaseResponse<string>>(`${environment.userServiceUrl}/api/users/checkEmailExist?email=${email}`).pipe(
      map(result => {
        if (result.isSuccessed) {
          return null;
        }
      }),
      catchError(error => {
        return of({ error: true, duplicated: true });
      })
    );
  }
}
