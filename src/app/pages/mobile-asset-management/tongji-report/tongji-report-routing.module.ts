import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TongjiReportComponent } from './tongji-report.component';

// 行驶报表
import { DriveReportComponent } from './drive-report/drive-report.component';

// 报警报表
import { AlertReportComponent } from './alert-report/alert-report.component';

const routes: Routes = [
  {
    path: '', 
    component:TongjiReportComponent,
    children:[
      {
        path: "xingshi",
        component:DriveReportComponent,
      },
      {
        path: "baojing",
        component:AlertReportComponent,
      },
      // {
      //   path: '',
      //   redirectTo: "baojing",
      //   pathMatch: 'full'
      // },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TongjiReportRoutingModule { }
