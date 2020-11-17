import { Injectable } from '@angular/core';

import { catchError, finalize, tap } from 'rxjs/operators';

// http 拦截器!
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse }from '@angular/common/http';

import { Observable } from 'rxjs'

/* 将未受影响的请求传递给下一个请求处理程序。*/

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() { }

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
        // 401
        // catchError((err: HttpErrorResponse)=>{
        //   console.log("------->err<-------------- ", err)
        // })
      );
  }

  Printerr(req:HttpErrorResponse){
    console.warn("输出,req: ",req)
  }


}
