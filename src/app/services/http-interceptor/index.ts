/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpInterceptorService } from './http-interceptor.service';

/** Http interceptor providers in outside-in order */
// 创建新的拦截器时，将它们添加到httpInterceptorProviders数组中，而无需重新访问AppModule。
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
];