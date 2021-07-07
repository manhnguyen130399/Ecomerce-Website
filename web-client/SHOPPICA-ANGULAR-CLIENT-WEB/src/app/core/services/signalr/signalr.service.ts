import { JwtService } from './../jwt/jwt.service';
import { environment } from './../../../../environments/environment';
import { Conversation } from './../../model/message/conversation';

import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private chatHubConnection: signalR.HubConnection

  private messageSubject = new Subject<Conversation>();

  messageEventEmitter$ = this.messageSubject.asObservable();

  constructor(private readonly jwtService: JwtService) { }


  public buildChatConnection() {
    this.chatHubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.messageServiceUrl}/chatHub`, { accessTokenFactory: () => this.jwtService.getToken() })
      .withAutomaticReconnect()
      .build();
  }


  public startChatConnection() {
    this.chatHubConnection
      .start()
      .then(() => console.log("Start Chat Connection"))
      .catch((err) => console.log('Error while starting connection: ' + err));
  }


  public addReceiveMessageDataListener = () => {
    this.chatHubConnection.on('NewMessage', (data) => {
      this.messageSubject.next(data);
    });
  }
}
