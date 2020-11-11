import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LiftMachineComponent } from './lift-machine.component';
import { StatusMonitorComponent } from './status-monitor/status-monitor.component';

import { DeviceKpiTongjiComponent } from './device-kpi-tongji/device-kpi-tongji.component';

const routes: Routes = [
  {
    path: '',
    component: LiftMachineComponent,
    children:[
      {
        path:'status',
        component: StatusMonitorComponent,
      },
      {
        path: 'kpi',
        component: DeviceKpiTongjiComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiftMachineRoutingModule { }
