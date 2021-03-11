import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseResponse } from '@models/base-response';
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
    return this.httpClient.get<BaseResponse<string>>(`${environment.localUserServiceUrl}/users/checkEmailExist?email=${email}`).pipe(
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
    return this.httpClient.post<BaseResponse<string>>(`${environment.localUserServiceUrl}/users/sellerRegister`, request).pipe(
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

    this.httpClient.post<BaseResponse<string>>(`${environment.localUserServiceUrl}/emails/sendmail`, emailContent).subscribe();
    localStorage.setItem(environment.verifyKey, btoa(code));
  }

}
