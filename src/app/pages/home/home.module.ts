import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NbCardModule } from '@nebular/theme';

// 快捷方式
import { ShortcutComponent } from './shortcut/shortcut.component';
// 我的消息
import { MyMessageComponent } from './my-message/my-message.component';
import { DeviceCardComponent } from './components/device-card/device-card.component';



@NgModule({
  declarations: [HomeComponent, ShortcutComponent, MyMessageComponent, DeviceCardComponent],
  imports: [
    CommonModule,
    NbCardModule,
  ]
})
export class HomeModule { }
