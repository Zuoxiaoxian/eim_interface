import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TongjiComponent } from './tongji.component';

// 设备管理
import { DeviceManageComponent } from './device-manage/device-manage.component';

// 试验任务管理
import { TestTaskManageComponent } from './test-task-manage/test-task-manage.component';

// 设备KPI报表
import { DeviceKpiReportComponent } from './device-kpi-report/device-kpi-report.component';

// 设备KPI报表2
import { DeviceKpiReport2Component } from './device-kpi-report2/device-kpi-report2.component';

// 工时kpi报表
import { ManHourKpiReportComponent } from './man-hour-kpi-report/man-hour-kpi-report.component';

// kpi报表详情---> 适应于设备kpi报表、工时kpi
import { KpiDetailComponent } from './kpi-detail/kpi-detail.component';

const routes: Routes = [
  { 
    path: '', 
    component: TongjiComponent,
    children:[
      { path: 'deviceManage', component: DeviceManageComponent },
      { path: 'testManage', component: TestTaskManageComponent },
      // { path: 'deviceKpiReport', component: DeviceKpiReportComponent },
      // { path: 'deviceKpiReport', component: DeviceKpiReport2Component },
      {
        path: 'deviceKpiReport',
        loadChildren: () => import('./device-kpi-report2/device-kpi-report2-routing.module')
          .then(m => m.DeviceKpiReport2RoutingModule),
      },

      // { path: 'manHourKpiReport', component: ManHourKpiReportComponent },
      { path: 'manHourKpiReport', 
        loadChildren:() =>import('./man-hour-kpi-report2/man-hour-kpi-report2-routing.module')
          .then(m=>m.ManHourKpiReport2RoutingModule)
      },
      { path: 'kpidetail', component: KpiDetailComponent },
      { path: '', redirectTo: 'deviceManage', pathMatch: 'full' },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TongjiRoutingModule { }
