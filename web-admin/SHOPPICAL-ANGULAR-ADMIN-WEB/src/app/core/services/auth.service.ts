import { UtilitiesService } from './utilities/utilities.service';
import { StorageService } from './storage/storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Login } from '@models/auth/login';
import { BaseResponse } from '@models/base-response';
import { environment } from '@env';
import { tap, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly jwtHelperService: JwtHelperService,
    private readonly storageService: StorageService,
    private readonly utilitiesService: UtilitiesService) {
  }

  login(request: Login): Observable<BaseResponse<string>> {
    return this.httpClient.post<BaseResponse<string>>(`${environment.userServiceUrl}/api/users/authenticate`, request).pipe(
      tap(result => {
        if (result.isSuccessed) {
          const tokenObject = this.jwtHelperService.decodeToken(result.data);
          const user = {
            ...tokenObject,
            token: result.data
          };
          this.storageService.setObject(environment.tokenKey, user);
        }
      }),
      catchError(error => {
        return of(error.error);
      })
    );
  }

  isAuthenticated() {
    return this.utilitiesService.isTokeExpire();
  }
}
