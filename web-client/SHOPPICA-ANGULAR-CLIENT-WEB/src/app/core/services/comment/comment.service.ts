import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private readonly httpClient: HttpClient) { }

  likeComment(id: number, time: number, isLike: boolean) {
    const params = new HttpParams()
      .append('isLike', isLike.toString())
      .append('time', time.toString());
    return this.httpClient.get<Comment>(`${environment.productServiceUrl}/api/comment/${id}`, { params }).pipe(
      catchError((error) => {
        return of(error.error);
      })
    );
  }

  comment(productId: number, blogId: number, content: string) {
    const body = {
      productId,
      blogId,
      content,
    };
    return this.httpClient.post<Comment>(`${environment.productServiceUrl}/api/comment/create`, body).pipe(
      catchError((error) => {
        return of(error.error);
      })
    );
  }

  deleteComment(id: number) {
    return this.httpClient.delete(`${environment.productServiceUrl}/api/comment/${id}`).pipe(
      catchError((error) => {
        return of(error.error);
      })
    );
  }

  editComment(id: number, content: string) {
    return this.httpClient.put(`${environment.productServiceUrl}/api/comment/${id}`, content).pipe(
      catchError((error) => {
        return of(error.error);
      })
    );
  }

}
