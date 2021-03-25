import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilitiesService } from '../services/utilities/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class SellerGuard implements CanActivate {
  constructor(private readonly utilitiesService: UtilitiesService, private readonly router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.utilitiesService.getRole() == "Seller") {
      return true;
    }
    this.router.navigate(['/auth/login']);
  }

}
