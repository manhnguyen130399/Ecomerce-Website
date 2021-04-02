import { UtilitiesService } from './../services/utilities/utilities.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private readonly utilitiesService: UtilitiesService, private readonly router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.utilitiesService.getRole() == "Admin") {
      return true;
    }
    this.router.navigate(['/auth/login']);
  }

}
