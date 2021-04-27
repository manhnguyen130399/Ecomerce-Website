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
  isHttpLoaded: boolean = false;
  constructor(private route: Router) { }
  ngOnInit(): void {
    document.getElementById("preload").className = "preload-none";

    this.route.events.subscribe(
      event => {
        if (event instanceof NavigationStart) {
          this.isLoaded = true;
        }
        else if (event instanceof NavigationEnd) {
          this.isLoaded = false;
        }
      },
      error => {
        this.isLoaded = false;
      })
  }

}
