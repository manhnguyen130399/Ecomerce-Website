import { Component, HostListener, Inject, OnInit, Optional } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  prevPosition = 0;
  isScrollUp = false;

  isShowMenuDrawer = false;
  isShowLoginDrawer = false;
  isShowRegisterDrawer = false;
  isShowResetPasswordDrawer = false;
  isShowShoppingCartDrawer = false;
  isShowSearchModal = false;
  constructor(
    @Inject(DOCUMENT) private document: NzSafeAny,
  ) { }

  ngOnInit(): void {

    const html = this.document.getElementsByTagName("html");
    html[0].classList.add("text");
  }

  openRegister() {
    this.isShowLoginDrawer = false;
    this.isShowResetPasswordDrawer = false;
    this.isShowRegisterDrawer = true;
  }

  openResetPassword() {
    this.isShowLoginDrawer = false;
    this.isShowRegisterDrawer = false;
    this.isShowResetPasswordDrawer = true;
  }

  openLogin() {
    this.isShowLoginDrawer = true;
    this.isShowRegisterDrawer = false;
    this.isShowResetPasswordDrawer = false;
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (scrollPosition < this.prevPosition && scrollPosition > 100) {
      this.isScrollUp = true;
    }
    else {
      this.isScrollUp = false;
    }

    if (scrollPosition === 0) {
      this.isScrollUp = false;
    }

    this.prevPosition = scrollPosition;
  }

}
