import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import {  PLV8_URL, ssotoken, loginurl} from '../../appconfig';

import {retry} from "rxjs/operators";
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ExpiredTokenComponent } from '../../pages-popups/token-diallog/expired-token/expired-token.component';


@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {
  
  constructor(private http: HttpClient, private router: Router, private dialogService:NbDialogService) { }
  
  
  // GET
  public get(url: string, headers?:any){
    if (headers == null){
      headers = {headers: new HttpHeaders({"Content-Type": "application/json"})}
    }
    return new Observable((observe)=>{
      this.http.get(url, headers).subscribe((response: any)=>{
        console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^observe^^^^^^^^^^^^^^^^^^",response);
        observe.next(response)
      },
      error=>{
        console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^observe^^^^error^^^^^^^^^^^^^^",error, error.status, error.error);
        var result = {
          result:{
            message:[
              {
                code: error.status,
                message:[error.error]
              }
            ]
          }
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
      // headers = {headers: new HttpHeaders(headers)}
    }
    return new Observable((observe)=>{
      this.http.post(url, data, headers).subscribe((response)=>{
        console.warn("http: 输出,req: ",response);
        observe.next(response)
      },
      error=>{
        var result = {
          result:{
            message:[
              {
                code: error.status,
                message:[error.error]
              }
            ]
          }
        }
        console.log("result===>", result)
        if (error.status === 401){
          var isdialg = localStorage.getItem("token_expired");
          if (JSON.parse(isdialg)){
            this.dialogService.open(ExpiredTokenComponent, { closeOnBackdropClick: false,} ).onClose.subscribe(
              name=>{
                console.log("token已过期，是否重新登录？",name)
                if(name){
                  localStorage.removeItem(ssotoken);
                  location.href = loginurl;
                  // localStorage.removeItem('token_expired');
                  observe.next(result);
                }else{
                  observe.next(result);
                }        
              });
              localStorage.setItem("token_expired", 'false');
          }
        }
        observe.next(result)
      })
    })
  };

  // plv8 调用plv8
  public callRPC(table: string, method: string, colums: object): Observable<{}> {
    var token = localStorage.getItem(ssotoken)? JSON.parse(localStorage.getItem(ssotoken)).token: '';
    const hearder = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token  // tslint:disable-line:object-literal-key-quotes
      })
    }; 
    if (method === 'get_default_role'){
      console.warn("token is ‘’", token)
      return this.post(PLV8_URL, {
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
      ).pipe(retry(3));

    }
    // return this.http.post(PLV8_URL, {
    return this.post(PLV8_URL, {
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
    const url = `/api/v1/gocron_token`;
    console.warn('url', url);
    const hearder = {
          headers: new HttpHeaders({
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
          }),
    };
    return this.http.get(url, hearder);
  }



      



}



