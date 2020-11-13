import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { localstorage, PLV8_URL, adminlocalstorage, ssotoken, loginurl} from '../../appconfig';

import {retry} from "rxjs/operators";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {
  
  constructor(private http: HttpClient, private router: Router) { }
  
  
  // GET
  public get(url: string, headers?:any){
    if (headers == null){
      headers = {headers: new HttpHeaders({"Content-Type": "application/json"})}
    }
    return new Observable((observe)=>{
      this.http.get(url, headers).subscribe((response: any)=>{
        observe.next(response)
      },
      error=>{
        console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^observe^^^^error^^^^^^^^^^^^^^",error, error.status, error.error);

        
        // this.router.navigate([loginurl])
        var result = {
          msg: error.error,
          status: error.status
        }
        observe.next(result)
      }
      )
    })
  };

  // POST
  public post(url: string, data: any, headers?:any){
    if (headers == null){
      headers = {headers: new HttpHeaders({"Content-Type": "application/json"})}
    }else{
      headers = {headers: new HttpHeaders(headers)}
    }
    return new Observable((observe)=>{
      this.http.post(url, data, headers).subscribe((response)=>{
        observe.next(response)
      },
      error=>{
        console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^post^^^^error^^^^^^^^^^^^^^",error, error.status, error.error);
        alert("post请求失败")
        var result = {
          msg: error.error,
          status: error.status
        }
        observe.next(result)
      })
    })
  };

  // plv8 调用plv8
  public callRPC(table: string, method: string, colums: object): Observable<{}> {
    var get_jili_app_token = localStorage.getItem(localstorage);
    var admintoken = localStorage.getItem(adminlocalstorage)? localStorage.getItem(adminlocalstorage): false;
    var token = localStorage.getItem(ssotoken)? localStorage.getItem(ssotoken): false;
    if(admintoken){
      const hearder = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + JSON.parse(admintoken).token  // tslint:disable-line:object-literal-key-quotes
        })
      };
      return this.http.post(PLV8_URL, {
          "jsonrpc": "2.0",
          "method": "callrpc",
          "params": {
              "table": table,
              "context": {"sessionid": "123", "user": "mt", "languageid": this.getLanguageID()},
              "method": method,
              "columns": colums,
              "pkey": "identifier"
          },
          "id": "1"
      },
      hearder).pipe(retry(3));
    }else{
      console.log("得到用户菜单：这个是从统一认证平添登录的");
      return this.http.post(PLV8_URL, {
        "jsonrpc": "2.0",
        "method": "callrpc",
        "params": {
            "table": table,
            "context": {"sessionid": "123", "user": "mt", "languageid": this.getLanguageID()},
            "method": method,
            "columns": colums,
            "pkey": "identifier"
        },
        "id": "1"
    },).pipe(retry(3));
    
    }
  }

  // 得到语言
  /**
   * name
   */
  public getLanguageID() {
    const language_map_id = {
      "zh-CN": 2052,
      "en-US": 1033
    };
    let currentLang = localStorage.getItem('currentLanguage')? localStorage.getItem('currentLanguage'): 'zh-CN';
    return language_map_id[currentLang];
  }





  get_gocron_token() {
    const url = `/api/user/login`;
    const payload = 'username=admin&password=mabo1234';
    const hearder = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
    };
    return this.http.post(url, payload.toString(), hearder);
  }



      



}

