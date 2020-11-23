/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,

  
} from '@nebular/theme';

// 多语言切换
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

// Aot requires an export function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

// ngx-toast
import { ToastrModule } from 'ngx-toastr';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NzTableModule } from 'ng-zorro-antd/table';

import { ComponentTModule } from './pages/tongji/components/componentT.module'

import { AgGridModule } from 'ag-grid-angular';
import { httpInterceptorProviders } from './services/http-interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    // Translate
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    ToastrModule.forRoot(),
    /**     ng-zorro-antd 模块        **/
    NgZorroAntdModule,
    NzTableModule,

    ComponentTModule, // 自定义共享模块
    AgGridModule.withComponents([]),
    
    
  ],
  bootstrap: [AppComponent],
  providers:[
    // httpInterceptorProviders 拦截器
    httpInterceptorProviders
  ]

  // 刷新
  // providers:[
  //   {
  //     provide: LocationStrategy, useClass:HashLocationStrategy
  //   }
  // ]
})
export class AppModule {
}
