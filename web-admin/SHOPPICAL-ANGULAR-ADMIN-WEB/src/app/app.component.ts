import { SignalrService } from './core/services/signalr/signalr.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private readonly signalrService: SignalrService) {

  }
  ngOnInit(): void {
    this.signalrService.buildConnection();
    this.signalrService.startConnection();
    this.signalrService.addNotifyDataListener();
  }
}
