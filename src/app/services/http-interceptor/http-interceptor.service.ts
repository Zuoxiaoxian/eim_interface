import { Injectable } from '@angular/core';

import { catchError, finalize, tap } from 'rxjs/operators';

// http 拦截器!
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse }from '@angular/common/http';

import { loginurl }from '../../appconfig';

// 路由
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ExpiredTokenComponent } from '../../pages-popups/token-diallog/expired-token/expired-token.component';
import { PublicmethodService } from '../publicmethod/publicmethod.service';

/* 将未受影响的请求传递给下一个请求处理程序。*/

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private router: Router, private dialogService: NbDialogService, private publicservice: PublicmethodService) { }

  // intercept(req: HttpRequest<any>, next: HttpHandler):
  //   Observable<HttpEvent<any>> {
  //     console.warn("拦截器:", req)
  //     return next.handle(req);
  //   }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const started = Date.now();
    let ok: string;

    // extend server response observable with logging
    return next.handle(req)
      .pipe(
        tap(
          // Succeeds when there is a response; ignore other events
          event => ok = event instanceof HttpResponse ? 'succeeded' : '',
          // Operation failed; error is an HttpErrorResponse
          // error => ok = 'failed'
          error => {ok = 'failed'; this.Printerr(error)}
        ),
        // Log when response observable either completes or errors 完成或出现错误时记录日志
        finalize(() => {
          const elapsed = Date.now() - started;
          const msg = `${req.method} "${req.urlWithParams}"
             ${ok} in ${elapsed} ms.`;
             console.warn("完成或出现错误时记录日志", msg)
        }),
      );
  }

  Printerr(req:HttpErrorResponse){
    console.warn("输出,req: ",req);
    // 500 502 503 504   miscellaneous/500
    var status_code = [500,501,502,503,504,505,506,507,508,509]
    var status = req.status;
    if (status_code.indexOf(status) != -1){
      this.router.navigate(['/miscellaneous/500'])
    }else if(status === 401){ // ExpiredTokenComponent
      var isdialg = localStorage.getItem("token_expired")? localStorage.getItem("token_expired"): 'true';
      if (JSON.parse(isdialg)){
        localStorage.setItem("token_expired", 'true');
      }else{
        localStorage.setItem("token_expired", 'true');
      }
      // this.dialogService.open(ExpiredTokenComponent, { closeOnBackdropClick: false,} ).onClose.subscribe(
      //   name=>{
      //     console.log("token已过期，是否重新登录？",name)
      //     if(name){
      //       this.router.navigate([loginurl])
      //     }else{
      //     }        
      //   });
    }else{
      this.danger()
    }
  }

  danger(){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"网络异常"});
  }

}
