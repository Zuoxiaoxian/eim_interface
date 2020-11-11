import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EimboardRoutingModule } from './eimboard-routing.module';
import { EimboardComponent } from './eimboard.component';
// import { DataVisualizationOneComponent } from './data-visualization-one/data-visualization-one.component';
import {NbCardModule, NbIconModule, NbLayoutModule, NbSidebarModule,} from '@nebular/theme';
// import { DataVisualizationGqComponent } from './data-visualization-gq/data-visualization-gq.component';
// import { RealTimeMonitoringComponent } from './real-time-monitoring/real-time-monitoring.component';
import { RealTimeMonitoringUpdateComponent } from './real-time-monitoring-update/real-time-monitoring-update.component';
// import { RealTimeMonitoring3DComponent } from './real-time-monitoring3-d/real-time-monitoring3-d.component';
import {PagesPopupsModule} from "../../pages-popups/pages-popups.module";
import { RealTimeFourwdDischargeComponent } from './real-time-fourwd-discharge/real-time-fourwd-discharge.component';
import { RealTimeFourwdSecondComponent } from './real-time-fourwd-second/real-time-fourwd-second.component';
import { RealTimeExperimentLayoutComponent } from './real-time-experiment-layout/real-time-experiment-layout.component';


@NgModule({
  declarations: [EimboardComponent, 
    // DataVisualizationOneComponent, 
    // DataVisualizationGqComponent, RealTimeMonitoringComponent, 
    RealTimeMonitoringUpdateComponent, 
    // RealTimeMonitoring3DComponent, 
    RealTimeFourwdDischargeComponent, RealTimeFourwdSecondComponent, RealTimeExperimentLayoutComponent],
  imports: [
    CommonModule,
    EimboardRoutingModule,
    NbIconModule,
    PagesPopupsModule,
    NbCardModule,

  ]
})
export class EimboardModule { }
