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
export class AuthGuard implements CanActivate {
  router = inject(Router);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    try {
      const token = localStorage.getItem('auth_token');
      const isLoggedIn =
        token !== null && token !== undefined && token.trim() !== '';
      if (!isLoggedIn) {
        console.log('AuthGuard - Redirecting to login');
        this.router.navigate(['/login']);
        return false;
      }

      return true;
    } catch (error) {
      console.error('AuthGuard - Error accessing localStorage:', error);
      this.router.navigate(['/login']);
      return false;
    }
  }
}
