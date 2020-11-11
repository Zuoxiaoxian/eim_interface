import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeviceInlineComponent } from './device-inline.component';

// 全国 一级
import { FirstLevelComponent } from './first-level/first-level.component';

// 市区 二级
import { SecondLevelComponent } from './second-level/second-level.component';

// room 三级
import { ThirdLevelComponent } from './third-level/third-level.component';

// 实时 四级
import { RealTimeComponent } from './real-time/real-time.component';

const routes: Routes = [
  {
    path:'',
    component:DeviceInlineComponent,
    children:[
      { path: "first-level", component: FirstLevelComponent },
      { path: "second-level", component: SecondLevelComponent },
      { path: "third-level", component: ThirdLevelComponent },
      { path: "four-level", component: RealTimeComponent },
      { path: "", redirectTo:"first-level", pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceInlineRoutingModule { }
