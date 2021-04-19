import { AuthService } from './../../core/services/auth/auth.service';
import { Component, HostListener, Inject, OnInit, Optional } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  prevPosition = 0;
  isScrollUp = false;
  isLogged = false;
  isShowMenuDrawer = false;
  isShowLoginDrawer = false;
  isShowRegisterDrawer = false;
  isShowResetPasswordDrawer = false;
  isShowShoppingCartDrawer = false;
  isShowSearchModal = false;
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router

  ) { }

  ngOnInit(): void {
    this.isLogged = this.authService.isAuthenticated();

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
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/account']);
    }
    else {
      this.isShowLoginDrawer = true;
      this.isShowRegisterDrawer = false;
      this.isShowResetPasswordDrawer = false;
    }
  }

  logout() {
    this.authService.logout();
    this.isLogged = false;
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
