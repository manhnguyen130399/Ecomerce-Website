import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private readonly httpClient: HttpClient) { }

  getStoreById(id: number) {
    return this.httpClient.get(`${environment.productServiceUrl}/api/store/${id}`).pipe(
      catchError(error => {
        return of(error.error);
      })
    );
  }
}
