import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SizeService {
  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  getAllSize() {
    return this.httpClient.get(`${environment.productServiceUrl}/api/size/size-all-store`).pipe(
      catchError(error => {
        return of(error.error);
      })
    );
  }
}
