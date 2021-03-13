import { UtilitiesService } from './../utilities/utilities.service';
import { Notify } from './../../../models/notifies/notify';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: signalR.HubConnection

  private notifySubject = new Subject<Notify>()

  notifyEventEmitter$ = this.notifySubject.asObservable();

  constructor(private readonly utilitiesService: UtilitiesService) { }

  public buildConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.orderServiceUrl}/orderNotifys`, { accessTokenFactory: () => this.utilitiesService.getToken() })
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
