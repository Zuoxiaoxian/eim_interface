/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { mq_config } from './appconfig';
import { EmqClientService } from './services/emq-client/emq-client.service';
import { MqttBean } from './services/emq-client/mqtt';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService, private seoService: SeoService,private mqservice:EmqClientService) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }

  mqConnect(){
    let mqBean :MqttBean= {
      hostname: mq_config.hostname,
      port: mq_config.port,
      clientId: mq_config.clientId,
      mqttConnectFail:this.mqttConnectFail,
    }
    this.mqservice.getmqtt(mqBean);
  }
  mqttConnectFail= (data) =>{
    console.log(data)
  }
}
