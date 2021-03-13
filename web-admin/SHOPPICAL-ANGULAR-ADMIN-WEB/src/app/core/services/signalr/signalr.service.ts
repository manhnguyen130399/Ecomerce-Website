import { OrderNotify } from './../../../models/orders/order-notify';
import { JwtService } from '@core/services/jwt.service';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: signalR.HubConnection

  private notifySubject = new Subject<OrderNotify>()

  notifyEventEmitter$ = this.notifySubject.asObservable();

  constructor(private readonly jwtService: JwtService) { }

  public buildConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.localOrderServiceUrl}/orderNotifys`, { accessTokenFactory: () => this.jwtService.getToken() })
      .withAutomaticReconnect()
      .build();
  }

  public startConnection() {
    this.hubConnection
      .start()
      .then(() => console.log("Start"))
      .catch((err) => console.log('Error while starting connection: ' + err));
  }

  public addNotifyDataListener = () => {
    this.hubConnection.on('NewOrderNotify', (data) => {
      this.notifySubject.next(data);
    });
  }
}
