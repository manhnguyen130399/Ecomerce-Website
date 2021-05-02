import { LoaderService } from './shared/modules/loader/loader.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild("preload", { static: true }) loadElement: ElementRef;


  isLoaded: boolean = false;
  constructor(
    private route: Router,
    private readonly loaderService: LoaderService
  ) { }
  ngOnInit(): void {
    document.getElementById("preload").className = "preload-none";

    this.route.events.subscribe(
      event => {
        if (event instanceof NavigationStart) {
          this.loaderService.showLoader();
        }
        else if (event instanceof NavigationEnd) {
          this.loaderService.hideLoader();
        }
      },
      error => {
        this.loaderService.hideLoader();
      })
  }


}
