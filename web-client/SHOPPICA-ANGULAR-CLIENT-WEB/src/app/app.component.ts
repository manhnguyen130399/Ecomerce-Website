import { delay } from 'rxjs/operators';
import { ShareService } from '@core/services/share/share.service';
import { AuthService } from '@core/services/auth/auth.service';
import { JwtService } from '@core/services/jwt/jwt.service';
import { Title } from '@angular/platform-browser';
import { LoaderService } from './shared/modules/loader/loader.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('preload', { static: true }) loadElement: ElementRef;
  isLoaded = false;
  showMessage = false;
  constructor(
    private route: Router,
    private readonly loaderService: LoaderService,
    private titleService: Title,
    private readonly authService: AuthService,
    private readonly shareService: ShareService,
  ) { }
  ngOnInit(): void {
    document.getElementById('preload').className = 'preload-none';

    this.shareService.authenticateSourceEmitted$.subscribe(isLogin => {
      this.showMessage = isLogin;
    })

    this.showMessage = this.authService.isAuthenticated();

    this.route.events.subscribe(
      event => {
        if (event instanceof NavigationStart) {
          this.loaderService.showLoader();
        }
        else if (event instanceof NavigationEnd) {
          const title = this.getTitle(this.route.routerState, this.route.routerState.root).join(' | ');
          this.titleService.setTitle(`${title} | Shopica`);
          this.loaderService.hideLoader();
        }
      },
      error => {
        this.loaderService.hideLoader();
      });
  }

  getTitle(state, parent) {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

}
