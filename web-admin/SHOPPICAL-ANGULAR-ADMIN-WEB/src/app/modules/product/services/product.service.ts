import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getAll(pageIndex: number, pageSize: number) {

    return this.httpClient.get(`${environment.userServiceUrl}/users/getListCustomer?pageIndex=${pageIndex}&PageSize=${pageSize}`).pipe(
      tap(res => {
        console.log(res);
      }),
      catchError(error => {
        return of(error.error);
      })
    )
  }
}
