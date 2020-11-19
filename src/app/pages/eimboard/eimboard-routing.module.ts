import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EimboardComponent } from './eimboard.component';

// import { DataVisualizationOneComponent } from './data-visualization-one/data-visualization-one.component';

// import { DataVisualizationGqComponent } from './data-visualization-gq/data-visualization-gq.component';

// import { RealTimeMonitoringComponent } from './real-time-monitoring/real-time-monitoring.component';
import { RealTimeMonitoringUpdateComponent } from './real-time-monitoring-update/real-time-monitoring-update.component';

// import { RealTimeMonitoring3DComponent } from './real-time-monitoring3-d/real-time-monitoring3-d.component';
import {RealTimeFourwdDischargeComponent} from "./real-time-fourwd-discharge/real-time-fourwd-discharge.component";
import {RealTimeFourwdSecondComponent} from "./real-time-fourwd-second/real-time-fourwd-second.component";
import { RealTimeExperimentLayoutComponent } from './real-time-experiment-layout/real-time-experiment-layout.component';


// board
const routes: Routes = [
  {
    path: '',
    component: EimboardComponent,
    children: [
      // {
      //   path: 'dashone',
      //   component: DataVisualizationOneComponent
      // },
      // {
      //   path: 'dashgq',
      //   component: DataVisualizationGqComponent
      // },
      // {
      //   path: 'rtm',
      //   component: RealTimeMonitoringComponent
      // },
      {
        path: 'rtm2',
        component: RealTimeMonitoringUpdateComponent
      },
      {
        path: 'rtm3',
        component: RealTimeFourwdDischargeComponent
      },
      {
        path: 'rtm3a',
        component: RealTimeFourwdSecondComponent
      },
      // {
      //   path: 'rtm3d',
      //   component: RealTimeMonitoring3DComponent
      // },
      {
        path: 'expLayout',
        component: RealTimeExperimentLayoutComponent
      },
      
      {
        path: '',
        redirectTo: 'dashone',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EimboardRoutingModule { }
