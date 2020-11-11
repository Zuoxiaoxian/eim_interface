import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceInlineRoutingModule } from './device-inline-routing.module';
import { DeviceInlineComponent } from './device-inline.component';
import { NbIconModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FirstLevelComponent } from './first-level/first-level.component';
import { SecondLevelComponent } from './second-level/second-level.component';
import { ThirdLevelComponent } from './third-level/third-level.component';
import { RealTimeComponent } from './real-time/real-time.component';


@NgModule({
  declarations: [DeviceInlineComponent, FirstLevelComponent, SecondLevelComponent, ThirdLevelComponent, RealTimeComponent],
  imports: [
    CommonModule,
    DeviceInlineRoutingModule,
    NbIconModule,
    NbEvaIconsModule,
  ]
})
export class DeviceInlineModule { }
