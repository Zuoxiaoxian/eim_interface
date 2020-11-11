import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {
      console.log('AuthGuard#canActivate called');
      let url: string = state.url;
      return this.checkLogin(url);
    }
    
    checkLogin(url: string): boolean {
      
      
      // if (this.authService.isLoggedIn) { 
        if (this.authService.alertisLoggeIn()) { 
          return true; 
        }
      console.log('isLoggedIn 为false：',url);
      this.authService.redirectUrl = url;
      this.router.navigate(['/setup']);
      return false;
    }
  
}
