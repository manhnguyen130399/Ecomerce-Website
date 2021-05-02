import { ShareService } from './../../core/services/share/share.service';
import { environment } from '@env';
import { StorageService } from './../../core/services/storage/storage.service';
import { AuthService } from './../../core/services/auth/auth.service';
import { Component, HostListener, Inject, OnInit, Optional } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Router } from '@angular/router';
import { Cart } from '@core/model/cart/cart';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  prevPosition = 0;
  numCartItems = 0;
  isScrollUp = false;
  isLogged = false;
  goToCartPage = false;
  isShowMenuDrawer = false;
  isShowLoginDrawer = false;
  isShowRegisterDrawer = false;
  isShowResetPasswordDrawer = false;
  isShowShoppingCartDrawer = false;
  isShowSearchModal = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly shareService: ShareService,
    private readonly storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.shareService.loginSuccessEmitted$.subscribe((loginStatus) => {
      this.isLogged = loginStatus;
    })

    this.shareService.changeNumCartItemEmitted$.subscribe((num) => {
      this.numCartItems = num;
    })


    this.shareService.gotoCartPageEmitted$.subscribe((isGotoPage: boolean) => {
      this.goToCartPage = isGotoPage;
    })

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
    if (!this.authService.isAuthenticated()) {
      this.isShowLoginDrawer = true;
      this.isShowRegisterDrawer = false;
      this.isShowResetPasswordDrawer = false;
    }
  }

  openShoppingCartDrawer() {
    this.goToCartPage
      ? this.router.navigate(['/cart'])
      : this.shareService.openCartDrawerEvent();

  }

  logout() {
    this.authService.logout();
    this.shareService.cartEmitEvent(new Cart());
    this.storageService.remove(environment.shippingAddressKey);
    this.isLogged = false;
    this.router.navigate(['/home']);
  }

  @HostListener('window:scroll', ['$event'])
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
