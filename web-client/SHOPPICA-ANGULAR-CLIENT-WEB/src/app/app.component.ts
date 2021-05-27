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
  constructor(
    private route: Router,
    private readonly loaderService: LoaderService,
    private titleService: Title
  ) { }
  ngOnInit(): void {
    document.getElementById('preload').className = 'preload-none';

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
