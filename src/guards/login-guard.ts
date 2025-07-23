import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    try {
      const token = localStorage.getItem('auth_token');
      const isLoggedIn =
        token !== null && token !== undefined && token.trim() !== '';

      if (isLoggedIn) {
        this.router.navigate(['/user']);
        return false;
      }

      return true;
    } catch (error) {
      console.error('LoginGuard - Error accessing localStorage:', error);
      return true;
    }
  }
}
