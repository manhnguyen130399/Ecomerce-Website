import { MessageRequest } from './../../model/message/message-request';
import { catchError } from 'rxjs/operators';
import { ConservationRequest } from './../../model/message/new-conservation-request';
import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { Conversation } from '@core/model/message/conversation';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private conversationSource = new Subject<Conversation>();

  conversationEmitted$ = this.conversationSource.asObservable();

  constructor(private readonly httpClient: HttpClient) { }

  openConversation(conversation: Conversation) {
    this.conversationSource.next(conversation);
  }

  createNewConservation(request: ConservationRequest) {
    return this.httpClient.post(`${environment.messageServiceUrl}/api/conversations/CreateConversation`, request).pipe(
      catchError(error => {
        return of(error.error);
      })
    );
  }

  getAllConversations(accountId: number) {
    return this.httpClient.get(`${environment.messageServiceUrl}/api/conversations/GetAllConversations/${accountId}`).pipe(
      catchError(error => {
        return of(error.error);
      })
    );
  }

  getMessageByConversation(conversationId: number) {
    return this.httpClient.get(`${environment.messageServiceUrl}/api/messages/getMessagesByConversation/${conversationId}`).pipe(
      catchError(error => {
        return of(error.error);
      })
    );
  }

  sendMessage(message: MessageRequest) {
    return this.httpClient.post(`${environment.messageServiceUrl}/api/messages/sendMessage`, message).pipe(
      catchError(error => {
        return of(error.error);
      })
    );
  }

  readMessage(conversationId: number) {
    return this.httpClient.patch(`${environment.messageServiceUrl}/api/messages/readMessage/${conversationId}`, {}).pipe(
      catchError(error => {
        return of(error.error);
      })
    );
  }
}
