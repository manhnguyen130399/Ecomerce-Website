import { SignalrService } from './../../core/services/signalr/signalr.service';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { OrderNotify } from '@app/models/orders/order-notify';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  isCollapsed = false;
  @ViewChild('audioElement', { static: true }) private audioElement;

  numNotify = 0;
  listNotify: OrderNotify[] = [];
  constructor(
    private readonly signalrService: SignalrService,
    private readonly renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.signalrService.notifyEventEmitter$.subscribe(data => {
      this.numNotify++;
      this.listNotify.push(data);
      this.playNotifySound();
    })
  }

  playNotifySound() {
    this.audioElement.nativeElement.insertAdjacentHTML("beforeend", "<audio autoplay><source src='/assets/musics/notification.mp3'></audio>")
    setTimeout(() => {
      const childElements = this.audioElement.nativeElement.childNodes;
      for (let child of childElements) {
        this.renderer.removeChild(this.audioElement.nativeElement, child);
      }
    }, 1000)
  }
  log() {

  }
}
