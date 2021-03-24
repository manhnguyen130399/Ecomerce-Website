import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseResponse } from '@app/modules/common/base-response';
import { environment } from '@env';
import { map, tap, catchError } from 'rxjs/operators';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly httpClient: HttpClient,) {
  }

  checkEmailExist(email: string): Observable<ValidationErrors> {
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

  sellerRegister(request): Observable<BaseResponse<string>> {
    return this.httpClient.post<BaseResponse<string>>(`${environment.userServiceUrl}/api/users/sellerRegister`, request).pipe(
      catchError(error => {
        return of(error.error);
      })
    );
  }

  sendCode(email): void {
    const code = Math.floor(Math.random() * (999999 - 100000) + 100000).toString();
    const emailContent = {
      To: email,
      Subject: "Verify Code",
      Content: code,
    }

    this.httpClient.post<BaseResponse<string>>(`${environment.userServiceUrl}/api/emails/sendmail`, emailContent).subscribe();
    localStorage.setItem(environment.verifyKey, btoa(code));
  }

  checkStoreExist(storeName: string): Observable<ValidationErrors> {
    return this.httpClient.get<BaseResponse<string>>(`${environment.productServiceUrl}/api/store/existed?storeName=${storeName}`).pipe(
      map(result => {
        if (result.code == "OK") {
          return { error: true, duplicated: true };
        }
      }),
      catchError(error => {
        return of(null);
      })
    );
  }

}
