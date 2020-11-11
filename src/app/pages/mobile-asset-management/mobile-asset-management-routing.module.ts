import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileAssetManagementComponent } from './mobile-asset-management.component';
// 定位监控
import { LocationMonitoringComponent } from './location-monitoring/location-monitoring.component';

// 统计报表

const routes: Routes = [
  {
    path: '',
    component: MobileAssetManagementComponent,
    children: [
      {
        path: 'location-monitore',
        component: LocationMonitoringComponent
      },

      {
        path: 'tongji-report',
        loadChildren: () => import('./tongji-report/tongji-report.module')
          .then(m => m.TongjiReportModule),
      },
      {
        path: 'gpsmodule-manage',
        loadChildren: () => import('./gps-module-manage/gps-module-manage.module')
          .then(m => m.GpsModuleManageModule),
      },


      {
        path: '', 
        redirectTo: 'location-monitore',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileAssetManagementRoutingModule { }
