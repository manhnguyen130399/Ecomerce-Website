import { ModalService } from './../../core/services/modal/modal.service';
import { map } from 'rxjs/operators';
import { ProductService } from '@core/services/product/product.service';
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
  wishlistIds = [];
  isScrollUp = false;
  isLogged = false;
  goToCartPage = false;
  isShowMenuDrawer = false;
  isShowRegisterDrawer = false;
  isShowResetPasswordDrawer = false;
  isShowSearchModal = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly shareService: ShareService,
    private readonly storageService: StorageService,
    private readonly productService: ProductService,
    private readonly modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.shareService.authenticateSourceEmitted$.subscribe((loginStatus) => {
      this.isLogged = loginStatus;
    });

    this.shareService.changeNumCartItemEmitted$.subscribe((num) => {
      this.numCartItems = num;
    });

    this.shareService.wishlistEmitted$.subscribe((wishListIds) => {
      this.wishlistIds = wishListIds;
    });

    this.shareService.gotoCartPageEmitted$.subscribe((isGotoPage: boolean) => {
      this.goToCartPage = isGotoPage;
    });

    this.isLogged = this.authService.isAuthenticated();

    this.getWishList();
  }

  getWishList() {
    if (this.isLogged) {
      this.productService.getWishList().pipe(
        map(res => {
          if (res.code === 'OK') {
            return res.data.content.map(x => x.id);
          }
        })
      ).subscribe(res => {
        this.shareService.wishListEmitEvent(res);
      });
    }
  }

  openRegister() {
    this.isShowResetPasswordDrawer = false;
    this.isShowRegisterDrawer = true;
  }

  openResetPassword() {
    this.isShowRegisterDrawer = false;
    this.isShowResetPasswordDrawer = true;
  }

  openLogin() {
    if (!this.isLogged) {
      this.modalService.openLoginDrawerEvent();
      this.isShowRegisterDrawer = false;
      this.isShowResetPasswordDrawer = false;
    }
  }

  openMenu() {
    this.modalService.openMenuDrawerEvent();
  }

  openShoppingCartDrawer() {
    this.goToCartPage
      ? this.router.navigate(['/cart'])
      : this.modalService.openCartDrawerEvent();
  }

  openWishList() {
    this.isLogged
      ? this.router.navigate(['/product/wishlist'])
      : this.modalService.openLoginDrawerEvent();
  }

  logout() {
    this.authService.logout();
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
