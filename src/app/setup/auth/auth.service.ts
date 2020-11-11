import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';

import { redirectUrl, localstorage, adminlocalstorage } from '../../../app/appconfig';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private localstorage: LocalStorageService) { }
  // 默认未登录, true 是未登录
  isLoggedIn = true;

  // 重定向的url
  redirectUrl: string = redirectUrl
  // redirectUrl: string = "http://localhost:4200/pages";

  login(): Observable<boolean>{
    return of(true).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = true)
    );
  };

  logout(): void {
    this.isLoggedIn = false;
  };

  alertisLoggeIn(){
    var mabo_app_token = this.localstorage.get(localstorage);
    // if (mabo_app_token != null){ // 登录
    //   this.isLoggedIn = true;
    //   return true
    // }else{
    //   this.isLoggedIn = false;
    //   return false;
    // }
    // admin 
    var admin_app_token = this.localstorage.get(adminlocalstorage);
    var token = this.localstorage.get('SSO');
    if (admin_app_token != null){// 登录
      this.isLoggedIn = true;
      return true
    }
    if(token != null ){
      this.isLoggedIn = true;
      return true
    }
    else{
      if (mabo_app_token != null){ // 登录
        this.isLoggedIn = true;
        return true
      }else{
        this.isLoggedIn = false;
        return false;
      }
    }
  }
  


}
