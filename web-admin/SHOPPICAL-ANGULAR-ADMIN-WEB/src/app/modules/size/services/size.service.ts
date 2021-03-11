import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  constructor(private readonly httpClient: HttpClient) { }

  getSizes(pageIndex: number, pageSize: number) {
    return this.httpClient.get(`${environment.productServiceUrl}/size?page=${pageIndex}&pageSize=${pageSize}`).pipe(
      catchError(error => {
        return of(error.error);
      })
    )
  }

}
