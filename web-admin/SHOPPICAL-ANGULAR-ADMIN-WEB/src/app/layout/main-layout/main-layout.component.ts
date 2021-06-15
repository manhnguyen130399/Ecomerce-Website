import { UtilitiesService } from './../../core/services/utilities/utilities.service';
import { Router } from '@angular/router';
import { environment } from '@env';
import { StorageService } from '@core/services/storage/storage.service';
import { NotifyService } from '@core/services/notify/notify.service';
import { SignalrService } from '@core/services/signalr/signalr.service';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Notify } from '@app/models/notifies/notify';
import { ProfileService } from '@app/modules/profile/services/profile.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  isCollapsed = false;
  sellerName: string;
  sellerImage: string;
  @ViewChild('audioElement', { static: true }) private audioElement;
  listNotify: Notify[] = [];
  numUnRead = 0;
  isAdmin: boolean;

  constructor(
    private readonly signalrService: SignalrService,
    private readonly renderer: Renderer2,
    private readonly notifyService: NotifyService,
    private readonly storageService: StorageService,
    private readonly router: Router,
    private readonly utilitiesService: UtilitiesService,
    private readonly profileService: ProfileService
  ) { }

  ngOnInit(): void {

    this.notifyService.getAllNotify().subscribe(res => {
      if (res.isSuccessed) {
        this.listNotify = res.data.content;
        this.numUnRead = this.listNotify.filter(x => !x.isRead).length;
      }
    })

    this.signalrService.notifyEventEmitter$.subscribe(data => {
      this.listNotify.unshift(data);
      this.numUnRead++;
      this.playNotifySound();
    })

    this.sellerName = this.utilitiesService.getName();
    this.sellerImage = this.utilitiesService.getImage();
    this.isAdmin = this.utilitiesService.getRole() === "Admin";

    this.profileService.currentSeller.subscribe(seller => {
      this.sellerName = seller.sellerName;
      this.sellerImage = seller.image;
    })
  }

  updateNumUnread() {
    this.notifyService.updateNumUnread().subscribe(res => {
      if (res.isSuccessed) {
        this.numUnRead = 0;
      }
    })
  }

  playNotifySound() {
    this.audioElement.nativeElement.insertAdjacentHTML("beforeend", "<audio autoplay><source src='assets/musics/notification.mp3'></audio>")
    setTimeout(() => {
      const childElements = this.audioElement.nativeElement.childNodes;
      for (let child of childElements) {
        this.renderer.removeChild(this.audioElement.nativeElement, child);
      }
    }, 1000)
  }

  logout() {
    this.storageService.remove(environment.tokenKey);
    this.router.navigate(['/auth/login']);
  }
}
